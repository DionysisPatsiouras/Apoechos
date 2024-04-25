from django.db import models
import datetime 
import random
from django.utils import timezone


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
    return "POST" + id


class Post(models.Model):

    post_id = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    profile_id = models.CharField(max_length=150, blank=False)

    body = models.CharField(max_length=150, blank=False)
    category = models.CharField(max_length=40, blank=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)

