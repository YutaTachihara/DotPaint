from django.urls import path
from .views import upload

app_name = 'dot_pict'
urlpatterns = [
    path('upload/', upload, name='upload'),
]
