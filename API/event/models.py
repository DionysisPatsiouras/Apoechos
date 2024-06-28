from django.db import models
from django.utils import timezone
import datetime 
import random
from profiles.models import *

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
    return "EVENT" + id



class Event(models.Model):

    eventId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=False)  
    date = models.DateTimeField(blank=False, null=False)
    location = models.CharField(max_length=100, blank=True) 
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")


    profile_location = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="profile_location", blank=True)
    created_by = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="created_by", blank=False) 
    main_bands = models.ManyToManyField(Profile, blank=False, related_name="main_bands")
    support_acts = models.ManyToManyField(Profile, blank=True, related_name="support_acts")


    def __str__(self):
        return self.eventId
