from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from datetime import datetime   
import datetime 
import random
from .managers import CustomUserManager
# from musician.models import Musician


def generate_pk():
    day = datetime.datetime.now().day
    minute = datetime.datetime.now().minute
    second = datetime.datetime.now().second
    randomNumber = random.randrange(1,500)
    id = str(day * randomNumber) + str(minute * second * randomNumber) + str(randomNumber * 2)
    return 'USER' + id

class CustomUser(AbstractBaseUser, PermissionsMixin):

    id = models.CharField(default=generate_pk, primary_key=True, max_length=255, unique=True)
    email = models.EmailField(_("email address"), unique=True)
    has_premium = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    musicianId = models.CharField(max_length=255, null=True)
    studioId = models.CharField(max_length=255, null=True)
    storeId = models.CharField(max_length=255, null=True)
    stageId = models.CharField(max_length=255, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email