from django.urls import path

from .views import top_view

app_name = 'top'
urlpatterns = [
    path('', top_view, name=''),
]
