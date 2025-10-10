from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Avg

from .models import Incident, Hospital, Ambulance, Volunteer, BloodRequest
from .serializers import (
    UserSerializer, RegisterSerializer,
    IncidentSerializer, HospitalSerializer, AmbulanceSerializer,
    VolunteerSerializer, BloodRequestSerializer
)

User = get_user_model()

# -------- User Registration & CRUD --------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


# -------- Incident, Hospital, Ambulance --------
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


# -------- Volunteers & Blood Requests --------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def join_volunteer(request):
    serializer = VolunteerSerializer(data=request.data)
    if serializer.is_valid():
        volunteer = serializer.save()
        return Response(VolunteerSerializer(volunteer).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def request_blood(request):
    serializer = BloodRequestSerializer(data=request.data)
    if serializer.is_valid():
        br = serializer.save()
        return Response(BloodRequestSerializer(br).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------- Placeholder Ambulance Request --------
@api_view(['POST'])
def request_ambulance(request):
    return Response({"message": "Ambulance request endpoint working."}, status=status.HTTP_200_OK)
