from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(
            user=instance,
            full_name=instance.username,
            email=instance.email
        )

# loan_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # create only if it doesn't exist
        UserProfile.objects.get_or_create(user=instance, defaults={
            'full_name': instance.username,
            'email': instance.email or ''
        })

import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import LoanApplication

def generate_otp():
    return str(random.randint(100000, 999999))

@receiver(post_save, sender=LoanApplication)
def send_otp_on_application(sender, instance, created, **kwargs):
    if created:
        otp = generate_otp()
        instance.otp = otp
        instance.save(update_fields=["otp"])

        send_mail(
            subject="Loan Application OTP Verification",
            message=f"Your OTP for loan application is {otp}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[instance.email],
            fail_silently=False,
        )

@receiver(post_save, sender=LoanApplication)
def status_change_email(sender, instance, created, **kwargs):
    if not created:
        send_mail(
            subject="Loan Application Status Update",
            message=f"Your loan application status is now: {instance.status}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[instance.email],
            fail_silently=False,
        )
