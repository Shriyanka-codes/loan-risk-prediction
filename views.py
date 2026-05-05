from rest_framework import generics, permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse, FileResponse

import pandas as pd

from .models import Loan, LoanApplication
from .serializers import (
    LoanSerializer,
    LoanApplicationSerializer,
    SignupSerializer,
    
    MyTokenObtainPairSerializer,
    UserSerializer,
    UserSerializerWithToken,
    LoanPredictSerializer
)
from .ai_model import predict_loan
from .utils import generate_ack_pdf


# ==========================
# JWT LOGIN
# ==========================
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# ==========================
# SIGNUP
# ==========================
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=201)
        return Response(serializer.errors, status=400)


# ==========================
# LOGIN (EMAIL + PASSWORD)
# ==========================
@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    username_or_email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=username_or_email)
    except User.DoesNotExist:
        try:
            user = User.objects.get(username=username_or_email)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=401)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({'detail': 'Invalid credentials'}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff
        }
    })

# ==========================
# LOANS (PUBLIC LIST)
# ==========================
class LoanListView(generics.ListAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [AllowAny]


# ==========================
# APPLY LOAN (REACT FILE UPLOAD)
# ==========================



# ==========================
# MY LOANS (LOGGED-IN USER)
# ==========================
class MyLoansView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        loans = LoanApplication.objects.filter(user=request.user)
        serializer = LoanApplicationSerializer(loans, many=True)
        return Response(serializer.data)


# ==========================
# DELETE LOAN
# ==========================
class DeleteLoanView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            loan = LoanApplication.objects.get(id=pk, user=request.user)
            loan.delete()
            return Response({"message": "Loan deleted successfully"}, status=200)
        except LoanApplication.DoesNotExist:
            return Response({"error": "Loan not found"}, status=404)


# ==========================
# USER PROFILE
# ==========================
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def userProfile(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    serializer = UserSerializer(user, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


# ==========================
# LOAN RESULT (AI LOGIC)
# ==========================
class LoanResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        app = LoanApplication.objects.get(id=pk, user=request.user)

        cgpa_score = app.cgpa / 10
        income_score = min(app.parent_income / 100000, 1)
        approval_percentage = round((cgpa_score * 0.6 + (1 - income_score) * 0.4) * 100, 2)

        serializer = LoanApplicationSerializer(app)
        data = serializer.data
        data["approval_percentage"] = approval_percentage
        return Response(data)


# ==========================
# LOAN ANALYSIS
# ==========================
class LoanAnalyzeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        app = LoanApplication.objects.get(id=pk, user=request.user)

        if app.cgpa >= 8.0 and app.parent_income <= 50000:
            approval = 90
            status_msg = "Approved"
        else:
            approval = 45
            status_msg = "Under Review"

        return Response({
            "approval_percentage": approval,
            "status": status_msg
        })


# ==========================
# AI LOAN PREDICTION
# ==========================


class PredictLoanAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoanPredictSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = predict_loan(**serializer.validated_data)
        return Response(result)


# ==========================
# ROUTES (OPTIONAL)
# ==========================
def getRoutes(request):
    return JsonResponse([
        {"POST": "/api/signup/"},
        {"POST": "/api/login/"},
        {"GET": "/api/loans/"},
        {"POST": "/api/applications/"},
        {"GET": "/api/my-loans/"},
    ], safe=False)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_application_status(request, pk):
    if not request.user.is_staff:
        return Response({"error": "Not authorized"}, status=403)

    try:
        application = LoanApplication.objects.get(id=pk)
    except LoanApplication.DoesNotExist:
        return Response({"error": "Application not found"}, status=404)

    status_value = request.data.get("status")

    if status_value not in ["APPROVED", "REJECTED"]:
        return Response({"error": "Invalid status"}, status=400)

    application.status = status_value
    application.save()

    return Response({"message": "Status updated successfully"})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bank_applications(request):
    if not request.user.is_staff:
        return Response({"error": "Not authorized"}, status=403)

    bank_name = request.user.username

    applications = LoanApplication.objects.filter(
        loan__bank_name__iexact=bank_name
    )

    serializer = LoanApplicationSerializer(applications, many=True)
    return Response(serializer.data)




from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import LoanApplication
from .serializers import LoanApplicationSerializer



class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
