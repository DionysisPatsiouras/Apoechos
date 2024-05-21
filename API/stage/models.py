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
    return "STAGE" + id


class Stage(models.Model):

    stageId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    title = models.CharField(max_length=200)
    city = models.CharField(max_length=200, blank=False, null=False)
    address = models.CharField(max_length=200, blank=False, null=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, default="stage")
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    def __str__(self):
        return self.title