from django.db import models



class Genre(models.Model):

    genre = models.CharField(max_length=200, blank=False, null=False)

    def __str__(self):
        return self.genre
        