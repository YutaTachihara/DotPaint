from django.urls import path
from .views import upload, create, PictureList, PictureDetail

app_name = 'dot_pict'
urlpatterns = [
    path('upload/', upload, name='upload'),
    path('create/', create, name="create"),
    path('index/', PictureList.as_view(), name="index"),
    path('<int:pk>/detail/', PictureDetail.as_view(), name="detail"),
]
