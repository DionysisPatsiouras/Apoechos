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
    # description = models.CharField(max_length=200, blank=False)
    icon = models.CharField(max_length=1000, blank=False)
    def __str__(self):
        return self.name



class City(models.Model):
    name = models.CharField(max_length=200, blank=False)
    latitude = models.CharField(max_length=200, blank=False)
    longitude = models.CharField(max_length=200, blank=False)
    def __str__(self):
        return self.name



class Genre(models.Model):
    name = models.CharField(max_length=200, blank=False)
    def __str__(self):
        return self.name



class Instrument(models.Model):
    name = models.CharField(max_length=200, blank=False)
    category = models.CharField(max_length=200, blank=False)
    def __str__(self):
        return self.name



class Studio_Service(models.Model):
    name = models.CharField(max_length=200, blank=False)
    def __str__(self):
        return self.name


class Store_Service(models.Model):
    name = models.CharField(max_length=200, blank=False)
    def __str__(self):
        return self.name


class Profile(models.Model):

    profileId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="user", unique=False
    )
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    category = models.ForeignKey(
        Category, related_name="category", on_delete=models.CASCADE
    )


    name = models.CharField(max_length=200, blank=False)

    address = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    websiteLink = models.URLField(blank=True, max_length=100)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")
    genres = models.ManyToManyField('Genre', blank=True)
    instruments = models.ManyToManyField('Instrument', blank=True)
    studio_services = models.ManyToManyField('Studio_Service', blank=True)
    store_services = models.ManyToManyField('Store_Service', blank=True)

    def __str__(self):
        return self.name



