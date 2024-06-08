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
    return "STORE" + id


class Store(models.Model):

    storeId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    title = models.CharField(max_length=200, blank=False)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    websiteLink = models.URLField(blank=True, max_length=100)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=False, blank=False
    )
    category = models.CharField(max_length=50, default="store")

    def __str__(self):
        return self.title


class Service(models.Model):

    title = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.title


class Store_Service(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, null=True)
