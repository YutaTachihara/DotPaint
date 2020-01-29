from django.views.generic.edit import FormView
from django.contrib.auth.models import User
from ..forms import login_form
from django.contrib.auth import authenticate, login
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy


class LoginView(auth_views.LoginView):
    template_name = 'accounts/login.html'
