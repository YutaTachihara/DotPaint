from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('blog/', include('blog.urls')),
    path('tubuyakkii/', include('tsubuyakkii.urls')),
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
]