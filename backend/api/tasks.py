# backend/api/tasks.py
from celery import shared_task
from .models import Incident, Ambulance, Hospital

@shared_task
def allocate_ambulance(incident_id):
    incident = Incident.objects.get(id=incident_id)
    # Logic to find nearest available ambulance
    ambulance = Ambulance.objects.filter(is_available=True).first()
    hospital = Hospital.objects.filter(is_available=True).first()
    if ambulance and hospital:
        incident.ambulance = ambulance
        incident.hospital = hospital
        incident.save()
        # Mark ambulance as busy
        ambulance.is_available = False
        ambulance.save()
    return incident.id
from celery import shared_task
from .models import Incident, Ambulance, Hospital, BloodBank, OrganBank
from .utils import find_nearest_hospital, find_nearest_ambulance
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@shared_task
def allocate_resources(incident_id):
    incident = Incident.objects.get(id=incident_id)
    ambulance = find_nearest_ambulance(incident.location)
    hospital = find_nearest_hospital(incident.location)
    
    if ambulance and hospital:
        incident.ambulance = ambulance
        incident.hospital = hospital
        incident.status = 'Allocated'
        incident.save()
        
        # Mark ambulance as busy
        ambulance.is_available = False
        ambulance.save()
        
        # Send real-time update
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "incidents",
            {"type": "incident_update", "content": {"id": incident.id, "status": incident.status}}
        )
    return incident.id
