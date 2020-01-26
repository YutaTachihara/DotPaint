from django import forms
from django.contrib.auth.models import User


class SignupForm(forms.ModelForm):
    class Meta:
        model = User

        fields = [
            'username',
            'password',
        ]

        widgets = {
            'password': forms.PasswordInput
        }

    password_confirmation = forms.CharField(
                                label='Confirmation',
                                max_length=100,
                                widget=forms.PasswordInput
                            )
