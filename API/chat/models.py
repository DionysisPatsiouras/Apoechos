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
    return "MSG" + id




class Message(models.Model):

    messageId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='receiver')
    message = models.CharField(max_length=1200)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('timestamp',)