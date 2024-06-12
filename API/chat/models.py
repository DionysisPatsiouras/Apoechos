from django.db import models
from users.models import CustomUser
import datetime
import random
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
    return "CHAT" + id







class Chat(models.Model):

    chatId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )
  

    profile1 = models.ForeignKey(
        Profile, related_name="profile1", on_delete=models.CASCADE
    )
    profile2 = models.ForeignKey(
        Profile, related_name="profile2", on_delete=models.CASCADE
    )


    def __str__(self):
        return self.name
