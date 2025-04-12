from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
  user_id = models.AutoField(primary_key=True)
  profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

  def __str__(self):
    return self.get_full_name() or self.username

class Room(models.Model):
  room_id = models.AutoField(primary_key=True)
  is_group = models.BooleanField(default=False)
  participants = models.ManyToManyField(CustomUser, related_name='rooms')
  created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_rooms')

  def get_room_name_for_user(self, user):
    if self.is_group:
      names = [user.first_name for user in self.participants.all()]
      return ', '.join(names)
    else:
      other = self.participants.exclude(user_id = user.user_id).first()
      return other.get_full_name() if other else "Unknown Chat"
    
  def __str__(self):
    return f"Room {self.room_id} (Group: {self.is_group})"
  
class Message(models.Model):
  message_id = models.AutoField(primary_key=True)
  room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
  sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
  content = models.TextField(blank=True)
  attachment = models.FileField(upload_to='chat_attachments/', blank=True, null=True)
  timestamp = models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default=False)

  def __str__(self):
    return f"Message from {self.sender.get_full_name()} in Room {self.room.room_id}"
  
class MessageReaction(models.Model):
  reaction_id = models.AutoField(primary_key=True)
  message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='reactions')
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  emoji = models.CharField(max_length=10)

  class Meta:
    unique_together = ('message', 'user') # user can only react once per message
  
  def __str__(self):
    return f'{self.user.get_full_name()} reacted to Message {self.message.message_id} with {self.emoji}'