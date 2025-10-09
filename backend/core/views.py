from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Avg
import math

from .models import User, Incident, Hospital, Ambulance
from .serializers import UserSerializer, IncidentSerializer, HospitalSerializer, AmbulanceSerializer
from .utils import geocode_place, simulate_ambulance

# -------------------- ViewSets --------------------

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

# -------------------- Dashboard Stats --------------------

@api_view(['GET'])
def dashboard_stats(request):
    return Response({
        "total_incidents": Incident.objects.count(),
        "avg_response_time": Incident.objects.aggregate(Avg('response_time'))['response_time__avg'],
        "ambulances_busy": Ambulance.objects.filter(status='busy').count()
    })

# -------------------- Utility --------------------

def haversine(lat1, lng1, lat2, lng2):
    R = 6371  # Earth radius in km
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

# -------------------- Ambulance Request --------------------

# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])  # Change to IsAuthenticated for production
# def request_ambulance(request):
    patient_name = request.data.get('patient_name')
    location_name = request.data.get('location_name')  # e.g., "CUSAT Main Gate"
    location_lat, location_lng = geocode_place(location_name)

    if location_lat is None or location_lng is None:
        return Response({'error': 'Could not geocode location'}, status=400)

    # Find nearest available ambulance
    ambulances = Ambulance.objects.filter(status='available')
    nearest = None
    min_distance = float('inf')
    for amb in ambulances:
        if amb.latitude is not None and amb.longitude is not None:
            dist = haversine(location_lat, location_lng, amb.latitude, amb.longitude)
            if dist < min_distance:
                min_distance = dist
                nearest = amb

    if not nearest:
        return Response({'error': 'No ambulance available'}, status=400)

    # Find nearest hospital with available beds
    hospitals = Hospital.objects.filter(available_beds__gt=0)
    nearest_hospital = None
    min_hospital_distance = float('inf')
    for hosp in hospitals:
        dist = haversine(location_lat, location_lng, hosp.latitude, hosp.longitude)
        if dist < min_hospital_distance:
            min_hospital_distance = dist
            nearest_hospital = hosp

    # Create incident
    incident = Incident.objects.create(
        reporter=request.user,
        location=f"{location_lat},{location_lng}",
        description=f"Reported by {patient_name}",
        status='assigned',
        ambulance=nearest,
        hospital=nearest_hospital
    )

    # Update ambulance status
    nearest.status = 'busy'
    nearest.save()

    # Simulate ambulance movement
    simulate_ambulance(vehicle_id=nearest.vehicle_id, path=[
        (location_lat, location_lng),
        ((location_lat + nearest_hospital.latitude) / 2, (location_lng + nearest_hospital.longitude) / 2),
        (nearest_hospital.latitude, nearest_hospital.longitude)
    ])

    return Response({
        'incident': IncidentSerializer(incident).data,
        'ambulance': AmbulanceSerializer(nearest).data,
        'hospital': HospitalSerializer(nearest_hospital).data
    })
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Ambulance, Incident, Hospital
from .serializers import AmbulanceSerializer, IncidentSerializer, HospitalSerializer
from .utils import geocode_place, simulate_ambulance, get_route_info
import math

ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImI5NWU1MzBhMzAzMTQxYjNiN2YxYjhmOWU0NGE0ZTg1IiwiaCI6Im11cm11cjY0In0="  # Replace with your real API key



@api_view(['POST'])
@permission_classes([AllowAny])  # Change to IsAuthenticated for production
def request_ambulance(request):
    patient_name = request.data.get('patient_name')
    location_name = request.data.get('location_name')
    location_lat, location_lng = geocode_place(location_name)

    if location_lat is None or location_lng is None:
        return Response({'error': 'Could not geocode location'}, status=400)

    ambulances = Ambulance.objects.filter(status='available')
    nearest = None
    min_distance = float('inf')
    for amb in ambulances:
        if amb.latitude is not None and amb.longitude is not None:
            dist = haversine(location_lat, location_lng, amb.latitude, amb.longitude)
            if dist < min_distance:
                min_distance = dist
                nearest = amb

    if not nearest:
        return Response({'error': 'No ambulance available'}, status=400)

    hospitals = Hospital.objects.filter(available_beds__gt=0)
    nearest_hospital = None
    min_hospital_distance = float('inf')
    for hosp in hospitals:
        dist = haversine(location_lat, location_lng, hosp.latitude, hosp.longitude)
        if dist < min_hospital_distance:
            min_hospital_distance = dist
            nearest_hospital = hosp

    incident = Incident.objects.create(
        reporter=request.user,
        location=f"{location_lat},{location_lng}",
        description=f"Reported by {patient_name}",
        status='assigned',
        ambulance=nearest,
        hospital=nearest_hospital
    )

    nearest.status = 'busy'
    nearest.save()

    simulate_ambulance(vehicle_id=nearest.vehicle_id, path=[
        (location_lat, location_lng),
        ((location_lat + nearest_hospital.latitude) / 2, (location_lng + nearest_hospital.longitude) / 2),
        (nearest_hospital.latitude, nearest_hospital.longitude)
    ])

    # Calculate route distance and ETA
    distance_km, eta_min = get_route_info(
        location_lat, location_lng,
        nearest_hospital.latitude, nearest_hospital.longitude,
        ORS_API_KEY
    )

    return Response({
        'incident': IncidentSerializer(incident).data,
        'ambulance': AmbulanceSerializer(nearest).data,
        'hospital': HospitalSerializer(nearest_hospital).data,
        'route_info': {
            'distance_km': distance_km,
            'eta_min': eta_min
        }
    })
