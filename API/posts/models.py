from django.db import models
import datetime
import random
from django.utils import timezone
from profiles.models import Category

from profiles.models import Profile


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


class Post_Title(models.Model):
    title = models.CharField(max_length=150, blank=False)

    categoryId = models.ForeignKey(
        Category, related_name="categoryId", on_delete=models.CASCADE
    )


    def __str__(self):
        return self.title


class Post(models.Model):

    post_id = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )
    
    profile = models.ForeignKey(
        Profile,
        related_name="profile",
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )


    body = models.CharField(max_length=150, blank=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)

    title = models.ForeignKey(
        Post_Title, on_delete=models.CASCADE, null=False
    )

    def __str__(self):
        return self.body


