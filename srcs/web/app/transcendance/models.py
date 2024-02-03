from django.db import models

class User(models.Model):
	id_user = models.AutoField(primary_key=True)
	login = models.CharField(max_length=50)
	email = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	first_name = models.CharField(max_length=50, null=True)
	last_name = models.CharField(max_length=50, null=True)
	is_admin = models.BooleanField(default=False)
	sexe = models.CharField(max_length=50)
	age = models.IntegerField()
	token = models.CharField(max_length=50, null=True)
	avatar = models.CharField(max_length=255, default='/var/www/imgs/default_avatar.webp')
	status = models.CharField(max_length=50, default='offline')
	date_creation = models.DateTimeField()
	date_last_connection = models.DateTimeField()
	id_list_friend = models.IntegerField()