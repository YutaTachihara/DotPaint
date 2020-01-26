from django.urls import path

from .views import (
    signup_view,
    login_view,
    home_view,
    logout_view,
)

app_name = 'accounts'
urlpatterns = [
    path('signup/', signup_view.SignupView.as_view(), name='signup'),
    path('login/', login_view.LoginView.as_view(), name='login'),
    path('home/', home_view.HomeView.as_view(), name='home'),
    path('logout/', logout_view.logout_view, name='logout'),
]
