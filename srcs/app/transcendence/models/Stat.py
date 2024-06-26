from typing import Any
from django.utils.translation import gettext as _
from django.db import models


class Stat_User_by_Game(models.Model):
	id = models.AutoField(primary_key=True)
	user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='stats')
	game = models.ForeignKey('Game', on_delete=models.CASCADE)
	nb_played = models.IntegerField(default=0)
	time_played = models.IntegerField(default=0)
	nb_win = models.IntegerField(default=0)
	nb_lose = models.IntegerField(default=0)
	ratio = models.IntegerField(default=0)
	def __str__(self):
		return f"{self.user.id} stat for {self.game.id} game {self.id}"
	def update(self,time:int, win: bool, draw: bool = False):
		self.nb_played += 1
		self.time_played += time
		if draw == False:
			if win == True:
				self.nb_win += 1
			else:
				self.nb_lose += 1
		self.ratio = self.nb_win / self.nb_played
		self.save()
	def stat_user_by_game_data(self):
		return {
			'id': self.id,
			'id_user': self.user.id,
			'id_game': self.game.id,
			'nb_played': self.nb_played,
			'time_played': self.time_played,
			'nb_win': self.nb_win,
			'nb_lose': self.nb_lose,
			'ratio': self.ratio
	}