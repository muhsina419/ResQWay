from rest_framework import serializers
from .models import User, Incident, Hospital, Ambulance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class AmbulanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambulance
        fields = '__all__'
