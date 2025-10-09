from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Ambulance

class AmbulanceConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.vehicle_id = self.scope['url_route']['kwargs']['vehicle_id']
        await self.accept()

    async def receive_json(self, content):
        lat, lng = content.get('lat'), content.get('lng')
        await database_sync_to_async(self.update_location)(lat, lng)
        await self.send_json({"message": "Location updated"})

    def update_location(self, lat, lng):
        amb, _ = Ambulance.objects.get_or_create(vehicle_id=self.vehicle_id)
        amb.latitude = lat
        amb.longitude = lng
        amb.save()
