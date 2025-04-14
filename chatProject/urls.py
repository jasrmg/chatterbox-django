
from django.contrib import admin
from django.urls import path, include

from django.conf.urls import handler404
from django.conf import settings
from django.conf.urls.static import static

from pathlib import Path

handler404 = 'chatApp.views.pagenotfound_view'

BASE_DIR = Path(__file__).resolve().parent.parent

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('chatApp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=BASE_DIR / "static")