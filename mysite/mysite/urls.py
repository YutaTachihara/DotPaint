from django.contrib import admin
from django.urls import include, path
urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('top/', include('top.urls')),
    path('dot_pict/', include('dot_pict.urls')),
]