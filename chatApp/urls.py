from django.urls import path, include
from . import views



urlpatterns = [
  path('login/', views.login_view, name='login'),
  path('logout/', views.logout_view, name='logout'),
  path('signup/', views.signup_view, name='signup'),
  path('chat/', views.chat_view, name='chat'),


  #error webpage
  # path('404pagenotfound/', views.pagenotfound_view, name='pagenotfound'),
  path('loginrequired/', views.login_required_view, name='login_required'),

]
