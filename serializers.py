from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Loan, LoanApplication, UserProfile

# ---------- SIGNUP ----------
class SignupSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role')

        user = User.objects.create_user(**validated_data)

        # 🔑 Bank users = staff
        if role == "bank":
            user.is_staff = True
            user.save()

        return user

# ---------- USER ----------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'token']

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)

# ---------- JWT ----------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

# ---------- LOANS ----------
class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'



# ---------- AI PREDICTION ----------
class LoanPredictSerializer(serializers.Serializer):
    income = serializers.FloatField()
    gpa = serializers.FloatField()
    family_size = serializers.IntegerField()
    bank_name = serializers.CharField()

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = '__all__'
        read_only_fields = ['user', 'status', 'applied_at']
        extra_kwargs = {
            'income_certificate': {'required': False, 'allow_null': True},
            'cgpa_certificate': {'required': False, 'allow_null': True},
            'admission_proof': {'required': False, 'allow_null': True},
            'student_photo': {'required': False, 'allow_null': True},
        }

