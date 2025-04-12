from django.contrib import admin
from . models import CustomUser, Room, Message, MessageReaction

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Room)
admin.site.register(Message)
admin.site.register(MessageReaction)
