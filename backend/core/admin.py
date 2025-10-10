from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Volunteer, BloodRequest

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'location', 'phone', 'joined_at', 'is_active')
    list_filter = ('is_active',)

@admin.register(BloodRequest)
class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ('id','patient_name','blood_type','hospital','requirement_date','fulfilled')
    list_filter = ('blood_type','fulfilled')
