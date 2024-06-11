from django.db import models
import datetime
import random
from django.utils import timezone
from musician.models import *
from studios.models import *


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
    return "MSG" + id


class Message(models.Model):

    messageId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    body = models.CharField(max_length=200, blank=False)
    created_at = models.DateTimeField(default=timezone.now)

    sender = models.ForeignKey(
        Musician,
        related_name="sender",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    receiver = models.ForeignKey(
        Musician,
        Studio,
        related_name="receiver",
        # on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    # def __str__(self):
    #     return self.user.email
