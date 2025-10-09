

from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all().order_by('-created_at')
    serializer_class = IncidentSerializer
    permission_classes = [permissions.IsAuthenticated]

class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    permission_classes = [permissions.IsAuthenticated]

class AmbulanceViewSet(viewsets.ModelViewSet):
    queryset = Ambulance.objects.all()
    serializer_class = AmbulanceSerializer
    permission_classes = [permissions.IsAuthenticated]


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Incident, Ambulance
from django.db.models import Avg, Count

@api_view(['GET'])
def dashboard_stats(request):
    return Response({
        "total_incidents": Incident.objects.count(),
        "avg_response_time": Incident.objects.aggregate(Avg('response_time'))['response_time__avg'],
        "ambulances_busy": Ambulance.objects.filter(is_available=False).count()
    })

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ambulance, Incident, Hospital
from .serializers import AmbulanceSerializer, IncidentSerializer, HospitalSerializer
from django.db.models import F
import math

# Calculate distance (Haversine formula)
def haversine(lat1, lng1, lat2, lng2):
    R = 6371  # Earth radius in km
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

@api_view(['POST'])
def request_ambulance(request):
    patient_name = request.data.get('patient_name')
    location_lat = float(request.data.get('location_lat'))
    location_lng = float(request.data.get('location_lng'))

    # Find nearest available ambulance
    ambulances = Ambulance.objects.filter(status='available')
    nearest = None
    min_distance = float('inf')
    for amb in ambulances:
        dist = haversine(location_lat, location_lng, amb.current_location_lat, amb.current_location_lng)
        if dist < min_distance:
            min_distance = dist
            nearest = amb

    if not nearest:
        return Response({'error': 'No ambulance available'}, status=400)

    # Find nearest hospital
    hospitals = Hospital.objects.all()
    nearest_hospital = None
    min_hospital_distance = float('inf')
    for hosp in hospitals:
        dist = haversine(location_lat, location_lng, hosp.location_lat, hosp.location_lng)
        if dist < min_hospital_distance:
            min_hospital_distance = dist
            nearest_hospital = hosp

    # Create incident
    incident = Incident.objects.create(
        patient_name=patient_name,
        location_lat=location_lat,
        location_lng=location_lng,
        status='assigned',
        ambulance=nearest,
        hospital=nearest_hospital
    )

    # Update ambulance status
    nearest.status = 'busy'
    nearest.save()

    return Response({
        'incident': IncidentSerializer(incident).data,
        'ambulance': AmbulanceSerializer(nearest).data,
        'hospital': HospitalSerializer(nearest_hospital).data
    })

# Create your views here.
