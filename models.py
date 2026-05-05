from django.db import models
from django.contrib.auth.models import User


class Loan(models.Model):
    bank_name = models.CharField(max_length=100)
    interest_rate = models.FloatField()
    max_amount = models.IntegerField()
    duration = models.CharField(max_length=50, null=True, blank=True)
    bank_logo = models.ImageField(upload_to='bank_logos/', null=True, blank=True)

    min_gpa = models.FloatField(default=0.0)
    min_income = models.FloatField(default=0.0)
    max_income = models.FloatField(default=1000000)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.bank_name


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gpa = models.FloatField()
    annual_income = models.FloatField()

    student_id = models.CharField(max_length=50, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    course_type = models.CharField(max_length=50, null=True, blank=True)

    previous_loans = models.IntegerField(default=0)

    marks_card = models.FileField(upload_to='documents/', null=True, blank=True)
    income_proof = models.FileField(upload_to='documents/', null=True, blank=True)

    def __str__(self):
        return self.user.username


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    college_name = models.CharField(max_length=150, blank=True)
    course = models.CharField(max_length=100, blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    income = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.full_name


class LoanApplication(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("OTP_VERIFIED", "OTP Verified"),
        ("DOCUMENT_VERIFIED", "Document Verified"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    college_name = models.CharField(max_length=100)
    course_name = models.CharField(max_length=100)
    cgpa = models.FloatField()

    father_name = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100)
    parent_income = models.DecimalField(max_digits=10, decimal_places=2)

    # ✅ FIXED (OPTIONAL DOCUMENTS)
    income_certificate = models.ImageField(upload_to='docs/', null=True, blank=True)
    cgpa_certificate = models.ImageField(upload_to='docs/', null=True, blank=True)
    admission_proof = models.ImageField(upload_to='docs/', null=True, blank=True)

    student_photo = models.ImageField(upload_to='photos/', null=True, blank=True)

    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_verified = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class LoanApplicationML(models.Model):
    name = models.CharField(max_length=100)
    income = models.FloatField()
    gpa = models.FloatField()
    family_size = models.IntegerField()
    bank_name = models.CharField(max_length=100)

    success_probability = models.FloatField(null=True, blank=True)
    additional_requirements = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class LoanHistory(models.Model):
    applicant_name = models.CharField(max_length=200, blank=True, null=True)
    income = models.FloatField()
    family_size = models.IntegerField()
    gpa = models.FloatField()
    bank = models.CharField(max_length=200)
    approved = models.IntegerField()
    extra = models.JSONField(blank=True, null=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.bank} - {self.approved}"
