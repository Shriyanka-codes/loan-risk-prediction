from django.contrib import admin
from .models import StudentProfile, Loan, LoanApplication
from django.contrib import admin
from .models import Loan, LoanApplication, StudentProfile, LoanHistory, UserProfile, LoanApplicationML

@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ("name", "loan", "amount", "status", "applied_at")
    list_filter = ("status", "loan")
    search_fields = ("name", "email")


admin.site.register(Loan)
admin.site.register(StudentProfile)
admin.site.register(UserProfile)
admin.site.register(LoanHistory)
admin.site.register(LoanApplicationML)







