from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    USER_TYPES = [
        ('PublicUser', 'Public User'),
        ('Ambulance', 'Ambulance User'),
        ('Hospital', 'Hospital Staff'),
    ]
    name = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    bloodType = models.CharField(max_length=3, blank=True, null=True)
    userType = models.CharField(max_length=20, choices=USER_TYPES, default='PublicUser')

    def __str__(self):
        return self.username


class Hospital(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    available_beds = models.IntegerField(default=0)
    location = models.CharField(max_length=255, null=True, blank=True, default="")

    def __str__(self):
        return self.name


class Ambulance(models.Model):
    vehicle_id = models.CharField(max_length=50, unique=True)
    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    status = models.CharField(max_length=20, default='idle')
    location = models.CharField(max_length=255, null=True, blank=True, default="")

    def __str__(self):
        return self.vehicle_id


class Incident(models.Model):
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    location = models.CharField(max_length=255, null=True, blank=True, default="")
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=30, default='reported')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Incident {self.id} - {self.status}"


class Volunteer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Volunteer: {self.user.username}" if self.user else f"Volunteer {self.id}"


class BloodRequest(models.Model):
    patient_name = models.CharField(max_length=200)
    hospital = models.CharField(max_length=255)
    bystander_name = models.CharField(max_length=200, blank=True, null=True)
    contact_number = models.CharField(max_length=50)
    blood_type = models.CharField(max_length=3)
    requirement_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    fulfilled = models.BooleanField(default=False)
    fulfilled_by = models.ForeignKey(Hospital, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"BloodRequest {self.id} for {self.patient_name} ({self.blood_type})"
