from django.urls import path, include
from . import views

urlpatterns = [
  path('login/', views.login_view, name='login'),
  path('logout/', views.logout_view, name='logout'),
  path('signup/', views.signup_view, name='signup'),
  path('chat/', views.chat_view, name='chat'),

]
