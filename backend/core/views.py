

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

# Create your views here.
# backend/core/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import VolunteerSerializer, BloodRequestSerializer
from .models import Volunteer, BloodRequest

@api_view(['POST'])
@permission_classes([AllowAny])
def join_volunteer(request):
    """
    Accepts POST payload like:
    { "location": "some location", "phone": "98765", "user": optional_user_id }
    Creates a Volunteer entry (user optional).
    """
    data = request.data.copy()
    # If frontend sends user id (rare), handle it; otherwise allow null
    serializer = VolunteerSerializer(data=data)
    if serializer.is_valid():
        volunteer = serializer.save()
        return Response(VolunteerSerializer(volunteer).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def request_blood(request):
    """
    Accepts POST payload:
    {
      patient_name, hospital, bystander_name, contact_number, blood_type, requirement_date (YYYY-MM-DD)
    }
    """
    data = request.data.copy()
    serializer = BloodRequestSerializer(data=data)
    if serializer.is_valid():
        br = serializer.save()
        return Response(BloodRequestSerializer(br).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# backend/core/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def request_ambulance(request):
    """
    Temporary placeholder endpoint for ambulance request.
    Frontend can post latitude/longitude etc. later.
    """
    return Response({"message": "Ambulance request endpoint working."}, status=status.HTTP_200_OK)
