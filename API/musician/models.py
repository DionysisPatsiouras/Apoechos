from django.db import models
from users.models import CustomUser
import datetime
import random

def generate_pk():
    day = datetime.datetime.now().day
    minute = datetime.datetime.now().minute
    second = datetime.datetime.now().second
    randomNumber = random.randrange(1, 500)
    id = (
        str(day * randomNumber)
        + str(minute * second * randomNumber)
        + str(randomNumber * 2)
    )
    return "MUSICIAN" + id

class Musician(models.Model):

    musicianId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    artistic_nickname = models.CharField(max_length=200, blank=False)
    city = models.CharField(max_length=100)
    bio = models.TextField(blank=True)  
    websiteLink = models.URLField(blank=True, max_length=100)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=False, blank=False
    )
    category = models.CharField(max_length=50, default="musician")

    def __str__(self):
        return self.user.email


class Instrument(models.Model):
    name = models.CharField(max_length=255)
    musician = models.ForeignKey(
        Musician, related_name="instruments", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=255)
    musician = models.ForeignKey(
        Musician, related_name="genres", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name