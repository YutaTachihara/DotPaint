from django.views.generic.edit import FormView
from django.contrib.auth.models import User
from ..forms import login_form
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect




class LoginView(FormView):
    model = User
    form_class = login_form.LoginForm
    template_name = 'accounts/login.html'
    success_url = 'http://google.com'

    def post(self, request, *arg, **kwargs):
        form = login_form.LoginForm(data=request.POST)
        if form.is_valid():
            username = form.data.get('username')
            password = form.data.get('password')
            user = authenticate(request, username=username, password=password)
            login(request, user)
            return redirect('http://google.com')
        else:
            return redirect('accounts/login.html')