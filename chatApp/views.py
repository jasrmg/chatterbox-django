from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib import messages
from . models import CustomUser
from django.http import HttpResponse, JsonResponse
from . forms import CustomUserCreationForm

# from django.contrib.auth.decorators import login_required 
# from django.views.decorators.csrf import csrf_exempt
# import json

from django.db.models import Q

# Create your views here.
def test(request):
  return HttpResponse('<h1>Hello World!</h1>')

# DJANGO LOGIN HELPER
def authenticate_by_username_or_email(request, identifier, password):
  User = get_user_model()
  try:
    user = User.objects.get(Q(username=identifier) | Q(email=identifier))
  except User.DoesNotExist:
    return None
  
  if user.check_password(password):
    return user
  
  return None

#ERRORS:
def pagenotfound_view(request, exception=None):
  return render(request, 'chatApp/404notfound.html', status=404)

def login_required_view(request):
  return render(request, 'chatApp/pleaselogin.html')

def signup_view(request):
  if request.method == 'POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      user = form.save()
      login(request, user)
      return redirect('chat')
    else:
      messages.error(request, 'There was an error in your form.')
  else:
    form = CustomUserCreationForm()
  return render(request, 'chatApp/signup.html')

# LOGIN WITH DJANGO
def login_view(request):
  if request.method == 'POST':
    identifier = request.POST.get('username-or-email')
    password = request.POST.get('password')

    user = authenticate_by_username_or_email(request, identifier, password)

    if user is not None:
      login(request, user)
      return redirect('chat')
    else:
      messages.error(request, 'Invalid username or password')

  return render(request, 'chatApp/login.html')

def logout_view(request):
  logout(request)
  return redirect('login')

# @login_required
def chat_view(request):
  if not request.user.is_authenticated:
    return render(request, 'chatApp/pleaselogin.html')
  
  context = {
    'userInfo': getUserInfo(request),
    'conversations': get_user_conversations(request.user)
  }
  return render(request, 'chatApp/chat.html', context)

def getUserInfo(request):
  user = request.user
  context = {
    'first_name': user.first_name,
    'last_name': user.last_name,
    'email': user.email,
    'profile_picture': user.profile_picture.url if user.profile_picture else None
  }
  return context

#get user conversations:
from . models import Room, Message
def get_user_conversations(user):
  rooms = Room.objects.filter(participants=user).prefetch_related('participants')

  conversations = []
  for room in rooms:
    latest_message = room.messages.order_by('-timestamp').first()

    if room.is_group:
      avatar = None
    else:
      other = room.participants.exclude(user_id=user.user_id).first()
      avatar = other.profile_picture.url if other and other.profile_picture else None

    conversations.append({
      'room_id': room.room_id,
      'room_name': room.get_room_name_for_user(user),
      'is_group': room.is_group,
      'avatar': avatar,
      'participants': room.participants.exclude(user_id=user.user_id),
      'latest_message': latest_message.content if latest_message else "",
      'latest_timestamp': latest_message.timestamp if latest_message else None
    })
  return conversations


from django.utils.timezone import localtime
def load_messages(request, room_id):
  if request.headers.get('x-requested-with') == 'XMLHttpRequest':
    room = get_object_or_404(Room, room_id=room_id)
    messages = Message.objects.filter(room=room).order_by('timestamp')
    current_user = request.user

    current_user_avatar = (
      current_user.profile_picture.url
      if current_user.profile_picture
      else "https://ui-avatars.com/api/?name=You&size=40"
    )

    message_list = [
      {
        'sender': f"{msg.sender.first_name} {msg.sender.last_name}",
        'text': msg.content,
        'timestamp': localtime(msg.timestamp).strftime('%I:%M %p'),
        'is_current_user': msg.sender == request.user,
        'sender_avatar': (
          msg.sender.profile_picture.url
          if msg.sender.profile_picture
          else "https://ui-avatars.com/api/?name={}&size=40".format(f"{msg.sender.first_name} {msg.sender.last_name}")
        ),
      } for msg in messages
    ]
    return JsonResponse({'messages': message_list, 'current_user_avatar': current_user_avatar}, status=200)
  return JsonResponse({'error': 'Invalid request'}, status=400)