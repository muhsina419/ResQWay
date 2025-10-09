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
import time
import requests
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def geocode_place(place_name: str):
    """
    Converts a place name into latitude and longitude using OpenStreetMap Nominatim API.
    """
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        'q': place_name,
        'format': 'json',
        'limit': 1
    }
    headers = {
        'User-Agent': 'ResQWay/1.0 (your_email@example.com)'  # Replace with your actual email
    }
    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    if data:
        return float(data[0]['lat']), float(data[0]['lon'])
    return None, None

def simulate_ambulance(vehicle_id: str, path: list[tuple[float, float]]):
    """
    Simulates ambulance movement by sending location updates via WebSocket.
    """
    channel_layer = get_channel_layer()
    for lat, lng in path:
        async_to_sync(channel_layer.group_send)(
            f"ambulance_{vehicle_id}",
            {
                "type": "location_update",
                "latitude": lat,
                "longitude": lng
            }
        )
        time.sleep(2)
import requests

def get_route_info(start_lat, start_lng, end_lat, end_lng, api_key):
    url = "https://api.openrouteservice.org/v2/directions/driving-car"
    headers = {
        "Authorization": api_key,
        "Content-Type": "application/json"
    }
    body = {
        "coordinates": [[start_lng, start_lat], [end_lng, end_lat]]
    }
    response = requests.post(url, json=body, headers=headers)
    data = response.json()

    if "features" in data:
        summary = data["features"][0]["properties"]["summary"]
        distance_km = summary["distance"] / 1000  # meters to km
        duration_min = summary["duration"] / 60   # seconds to minutes
        return round(distance_km, 2), round(duration_min, 1)
    return None, None
