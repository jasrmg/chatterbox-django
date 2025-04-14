from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    user = self.scope["user"]
    if user.is_authenticated:
      await self.set_user_online(user, True)
    await self.accept()

  async def disconnect(self, code):
    user = self.scope["user"]
    if user.is_authenticated:
      await self.set_user_online(user, False)

  @database_sync_to_async
  def set_user_online(self, user, is_online):
    user.is_online = is_online
    user.save()