from reportlab.pdfgen import canvas
from django.conf import settings
import os

def generate_ack_pdf(application):
    file_path = os.path.join(
        settings.MEDIA_ROOT,
        f"ack_{application.id}.pdf"
    )

    c = canvas.Canvas(file_path)
    c.setFont("Helvetica", 12)

    c.drawString(100, 750, "LOAN APPLICATION ACKNOWLEDGEMENT")
    c.drawString(100, 720, f"Name: {application.name}")
    c.drawString(100, 700, f"Bank: {application.loan.bank_name}")
    c.drawString(100, 680, f"Amount: ₹{application.amount}")
    c.drawString(100, 660, f"Status: {application.status}")
    c.drawString(100, 640, f"Applied On: {application.applied_at}")

    c.save()
    return file_path
