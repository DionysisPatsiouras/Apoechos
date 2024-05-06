from django.db import models
from users.models import CustomUser
import datetime
import random
from genre.models import Genre


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
    return "MUSICIAN" + id


def generate_studio_pk():
    day = datetime.datetime.now().day
    minute = datetime.datetime.now().minute
    second = datetime.datetime.now().second
    randomNumber = random.randrange(1, 500)
    id = (
        str(day * randomNumber)
        + str(minute * second * randomNumber)
        + str(randomNumber * 2)
    )
    return "STUDIO" + id


def generate_store_pk():
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


class Musician(models.Model):

    musicianId = models.CharField(
        default=generate_pk, primary_key=True, max_length=255, unique=True
    )

    artistic_nickname = models.CharField(max_length=200, blank=False)
    city = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    websiteLink = models.URLField(blank=True, max_length=100)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=False, blank=False
    )
    category = models.CharField(max_length=50, default="musician")

    def __str__(self):
        return self.user.email


class MusicianGenre(models.Model):

    musicianId = models.ForeignKey(
        Musician, related_name="musicianId2", on_delete=models.CASCADE
    )
    genreId = models.OneToOneField(Genre, related_name="id2", on_delete=models.CASCADE)
    genreName = models.CharField(max_length=50, default="")


# class Band(models.Model):

#     name = models.CharField(max_length=200)
#     city = models.CharField(max_length=200)
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     category = models.CharField(max_length=50, default='band')
#     photo = models.ImageField(null=True, blank=True, upload_to="images/")

#     def __str__(self):
#         return self.name


class Studio(models.Model):

    studioId = models.CharField(
        default=generate_studio_pk, primary_key=True, max_length=255, unique=True
    )

    title = models.CharField(max_length=200)
    city = models.CharField(max_length=200, blank=False, null=False)
    address = models.CharField(max_length=200, blank=False, null=False)

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=False, blank=False
    )

    # recordings = models.BooleanField(default=False)
    # rehearsals = models.BooleanField(default=False)
    # mixing = models.BooleanField(default=False)
    # mastering = models.BooleanField(default=False)

    photo = models.ImageField(null=True, blank=True, upload_to="images/")
    category = models.CharField(max_length=50, default="studio")

    def __str__(self):
        return self.title


class Stage(models.Model):

    title = models.CharField(max_length=200)
    city = models.CharField(max_length=200, blank=False, null=False)
    address = models.CharField(max_length=200, blank=False, null=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, default="stage")
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    def __str__(self):
        return self.title


class Store(models.Model):

    storeId = models.CharField(
        default=generate_store_pk, primary_key=True, max_length=255, unique=True
    )

    title = models.CharField(max_length=200)
    city = models.CharField(max_length=200, blank=False, null=False)
    address = models.CharField(max_length=200, blank=False, null=False)

    # open = models.BooleanField(default=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, default="store")
    photo = models.ImageField(null=True, blank=True, upload_to="images/")

    def __str__(self):
        return self.title




class Song(models.Model):
    name = models.CharField(max_length=255)
    musician = models.ForeignKey(
        Musician, related_name="songs", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

class Instrument(models.Model):
    name = models.CharField(max_length=255)
    musician = models.ForeignKey(
        Musician, related_name="instruments", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


# FOR TESTING
class MusInst(models.Model):
    musician = models.ForeignKey(
        Musician, related_name="skata", on_delete=models.CASCADE
    )
    # instrument = models.ForeignKey(
    #     Instrument, related_name="instrument", on_delete=models.CASCADE
    # )
