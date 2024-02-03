# import sys
from django.shortcuts import render # permet de renvoyer une page html
# from django.http import HttpResponseRedirect # permet de rediriger l'utilisateur
# from .forms import LoginForm # importe le formulaire LoginForm depuis le fichier forms.py

# def index(request):
# 	return render(request, 'index.html')

# def login(request):
# 	if request.method == 'POST':
# 		form = LoginForm(request.POST)
# 		if form.is_valid():
# 			# Traitez les données du formulaire
# 			login = form.cleaned_data['login']
# 			password = form.cleaned_data['password']
# 			# Faites ici ce que vous voulez avec les données (vérification, etc.)
# 			print(login, password)
# 			# Redirigez l'utilisateur vers une autre page après la soumission du formulaire
# 			return HttpResponseRedirect('/games/')
# 	else:
# 		print('hello')
# 		return HttpResponseRedirect('/signin/')

# 	return render(request, 'index.html', {'form': form})

def pong(request):
	return render(request, 'pong.html')