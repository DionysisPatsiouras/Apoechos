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
    return "PROFILE" + id


class Category(models.Model):

    name = models.CharField(max_length=200, blank=False)
    color = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.name


class Profile(models.Model):

    profileId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    name = models.CharField(max_length=200, blank=False)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    websiteLink = models.URLField(blank=True, max_length=100)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='articles', unique=False)


    category = models.ForeignKey(
        Category, related_name="category", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
