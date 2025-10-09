from geopy.distance import geodesic
from .models import Hospital, Ambulance

def find_nearest_hospital(location):
    hospitals = Hospital.objects.filter(is_available=True)
    nearest = min(hospitals, key=lambda h: geodesic((h.location['lat'], h.location['lng']),
                                                     (location['lat'], location['lng'])).km)
    return nearest

def find_nearest_ambulance(location):
    ambulances = Ambulance.objects.filter(is_available=True)
    nearest = min(ambulances, key=lambda a: geodesic((a.location['lat'], a.location['lng']),
                                                     (location['lat'], location['lng'])).km)
    return nearest
