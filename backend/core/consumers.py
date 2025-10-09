# from channels.generic.websocket import AsyncJsonWebsocketConsumer
# from channels.db import database_sync_to_async
# from .models import Ambulance

# class AmbulanceConsumer(AsyncJsonWebsocketConsumer):
#     async def connect(self):
#         self.vehicle_id = self.scope['url_route']['kwargs']['vehicle_id']
#         await self.accept()

#     async def receive_json(self, content):
#         lat, lng = content.get('lat'), content.get('lng')
#         await database_sync_to_async(self.update_location)(lat, lng)
#         await self.send_json({"message": "Location updated"})

#     def update_location(self, lat, lng):
#         amb, _ = Ambulance.objects.get_or_create(vehicle_id=self.vehicle_id)
#         amb.latitude = lat
#         amb.longitude = lng
#         amb.save()
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class AmbulanceConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.vehicle_id = self.scope['url_route']['kwargs']['vehicle_id']
        self.group_name = f"ambulance_{self.vehicle_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'location_update',
                'latitude': data['latitude'],
                'longitude': data['longitude']
            }
        )

    async def location_update(self, event):
        await self.send(text_data=json.dumps({
            'latitude': event['latitude'],
            'longitude': event['longitude']
        }))
