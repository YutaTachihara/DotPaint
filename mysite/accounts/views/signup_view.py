from django.views.generic.edit import CreateView
from django.contrib.auth.models import User
from ..forms import signup_form
from django.contrib import messages



class SignupView(CreateView):
    model = User
    form_class = signup_form.SignupForm
    success_url = 'http://google.com'
    template_name = 'accounts/user_form.html'