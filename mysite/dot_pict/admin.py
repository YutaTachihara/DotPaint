from django.contrib import admin

from .models import Picture


class PictureAdmin(admin.ModelAdmin):
    fields = ['file']

admin.site.register(Picture, PictureAdmin)
