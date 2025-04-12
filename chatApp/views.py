from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib import messages
from . models import CustomUser
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required 
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

# LOGIN USING AJAX
# @csrf_exempt
# def login_view(request):
#   User = get_user_model()
#   if request.method == 'POST':
#     try:
#       data = json.loads(request.body)
#       identifier = data.get('username_or_email')
#       password = data.get('password')
#     except json.JSONDecodeError:
#       return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)

#     try:
#       user = User.objects.get(Q(username=identifier) | Q(email=identifier))
#     except User.DoesNotExist:
#       return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=401)

#     if user.check_password(password):
#       login(request, user)
#       return JsonResponse({'success': True})
#     else:
#       return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=401)

#   return JsonResponse({'success': False, 'error': 'Only POST allowed'}, status=405)


def signup_view(request):
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

@login_required
def chat_view(request):
  return render(request, 'chatApp/chat.html')