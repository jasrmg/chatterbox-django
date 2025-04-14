from django.contrib import admin
from . models import CustomUser, Room, Message, MessageReaction

# Register your models here.

class MessageAdmin(admin.ModelAdmin):
  list_display = ['message_id', 'sender', 'room', 'timestamp']

admin.site.register(CustomUser)
admin.site.register(Room)
admin.site.register(Message, MessageAdmin)
admin.site.register(MessageReaction)
