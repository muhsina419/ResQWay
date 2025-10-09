from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = [
        ('public', 'Public'),
        ('hospital', 'Hospital'),
        ('ambulance', 'Ambulance'),
        ('volunteer', 'Volunteer'),
        ('admin', 'Admin')
    ]
    role = models.CharField(max_length=20, choices=ROLES, default='public')
    phone = models.CharField(max_length=20, blank=True, null=True)

class Incident(models.Model):
    reporter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.TextField()
    status = models.CharField(max_length=20, default='reported')
    created_at = models.DateTimeField(auto_now_add=True)

class Hospital(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    available_beds = models.IntegerField(default=0)

class Ambulance(models.Model):
    vehicle_id = models.CharField(max_length=50, unique=True)
    driver = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    status = models.CharField(max_length=20, default='idle')
