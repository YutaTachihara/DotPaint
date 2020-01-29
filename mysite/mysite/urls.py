from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('top/', include('top.urls')),
    path('dot_pict/', include('dot_pict.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)