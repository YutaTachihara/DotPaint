from django.views.generic.base import RedirectView
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.urls import reverse


def logout_view(request):
        logout(request)
        return redirect(reverse('top:'))
