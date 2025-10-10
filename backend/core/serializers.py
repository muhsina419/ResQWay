from rest_framework import serializers
from .models import User, Incident, Hospital, Ambulance, Volunteer, BloodRequest



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["name", "email", "password", "phone", "bloodType", "userType"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        # Optional: use email as username
        user.username = validated_data.get("email", user.name)
        user.set_password(password)
        user.save()
        return user



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


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        read_only_fields = ('id', 'joined_at')


class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'fulfilled')
