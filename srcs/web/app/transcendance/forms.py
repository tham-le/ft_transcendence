from django import forms # permet de créer des formulaire

class LoginForm(forms.Form):
	login = forms.CharField(max_length=100)
	password = forms.CharField(widget=forms.PasswordInput)