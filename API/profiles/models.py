from django.db import models
from users.models import CustomUser
import datetime 
import random
from genre.models import Genre

def generate_pk():
    day = datetime.datetime.now().day
    minute = datetime.datetime.now().minute
    second = datetime.datetime.now().second
    randomNumber = random.randrange(1,500)
    id = str(day * randomNumber) + str(minute * second * randomNumber) + str(randomNumber * 2)
    return 'MUSICIAN' + id
    
def generate_studio_pk():
    day = datetime.datetime.now().day
    minute = datetime.datetime.now().minute
    second = datetime.datetime.now().second
    randomNumber = random.randrange(1,500)
    id = str(day * randomNumber) + str(minute * second * randomNumber) + str(randomNumber * 2)
    return 'STUDIO' + id


class Musician(models.Model):
    
    musicianId = models.CharField(default=generate_pk, primary_key=True, max_length=255, unique=True)

    artistic_nickname = models.CharField(max_length=200, blank=False)
    city = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    websiteLink = models.URLField(blank=True, max_length=100)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=False, blank=False)
    category = models.CharField(max_length=50, default='musician')


    def __str__(self):
        return self.user.email
    


class City(models.Model):
    city = models.CharField(max_length=200, blank=False)

class MusicianGenre(models.Model):

    musicianId = models.ForeignKey(Musician, related_name='musicianId2', on_delete=models.CASCADE)
    genreId = models.OneToOneField(Genre, related_name='id2', on_delete=models.CASCADE)


# class Band(models.Model):

#     name = models.CharField(max_length=200)
#     city = models.CharField(max_length=200)
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     category = models.CharField(max_length=50, default='band')
#     photo = models.ImageField(null=True, blank=True, upload_to="images/")

#     def __str__(self):
#         return self.name



class Studio(models.Model):

    studioId = models.CharField(default=generate_studio_pk, primary_key=True, max_length=255, unique=True)

    title = models.CharField(max_length=200)
    city = models.CharField(max_length=200, blank=False, null=False)
    address = models.CharField(max_length=200, blank=False, null=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=False, blank=False)

    # recordings = models.BooleanField(default=False)
    # rehearsals = models.BooleanField(default=False)
    # mixing = models.BooleanField(default=False)
    # mastering = models.BooleanField(default=False)

    photo = models.ImageField(null=True, blank=True, upload_to="images/")
    category = models.CharField(max_length=50, default='studio')
   

    def __str__(self):
        return self.title


# class Stage(models.Model):

#     title = models.CharField(max_length=200)
#     city = models.CharField(max_length=200, blank=False, null=False)
#     address = models.CharField(max_length=200, blank=False, null=False)
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     category = models.CharField(max_length=50, default='stage')
#     photo = models.ImageField(null=True, blank=True, upload_to="images/")

#     def __str__(self):
#         return self.title



# class Store(models.Model):

#     title = models.CharField(max_length=200)
#     city = models.CharField(max_length=200, blank=False, null=False)
#     address = models.CharField(max_length=200, blank=False, null=False)
#     open = models.BooleanField(default=False)
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     category = models.CharField(max_length=50, default='store')
#     photo = models.ImageField(null=True, blank=True, upload_to="images/")
    

#     def __str__(self):
#         return self.title





# class Genre(models.Model):

#     user = models.OneToOneField(Musician,on_delete=models.CASCADE,related_name='genres', null=False, blank=False)

#     rock = models.BooleanField(default=False)
#     classic_rock = models.BooleanField(default=False)
#     hard_rock = models.BooleanField(default=False)
#     heavy_metal = models.BooleanField(default=False)
#     punk = models.BooleanField(default=False)
    
#     pop = models.BooleanField(default=False)
#     alternative = models.BooleanField(default=False)
#     jazz = models.BooleanField(default=False)
#     blues = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.user.email
        




# class Instrument(models.Model):

#     user = models.OneToOneField(Musician, on_delete=models.CASCADE)

#       # strings 11
#     classic_guitar = models.BooleanField(default=False)
#     electric_guitar = models.BooleanField(default=False)
#     acoustic_guitar = models.BooleanField(default=False)
#     electric_bass = models.BooleanField(default=False)
#     acoustic_bass = models.BooleanField(default=False)
#     double_bass = models.BooleanField(default=False)
#     violin = models.BooleanField(default=False)
#     viola = models.BooleanField(default=False)
#     cello = models.BooleanField(default=False)
#     harp = models.BooleanField(default=False)
#     ukelele = models.BooleanField(default=False)


#     # percussion 4
#     drums = models.BooleanField(default=False)
#     cajon = models.BooleanField(default=False)
#     congos = models.BooleanField(default=False)
#     tambourine = models.BooleanField(default=False)

#     # brass 7
#     trumbet = models.BooleanField(default=False)
#     trombone = models.BooleanField(default=False)
#     french_horn = models.BooleanField(default=False)
#     tuba = models.BooleanField(default=False)
#     cornet = models.BooleanField(default=False)
#     piccolo_trumbet = models.BooleanField(default=False)
#     flugelhorn = models.BooleanField(default=False)

#     # vocals 8
#     vocalist = models.BooleanField(default=False)
#     backing_vocalist = models.BooleanField(default=False)
#     soprano = models.BooleanField(default=False)
#     mezzo_soprano = models.BooleanField(default=False)
#     contralto = models.BooleanField(default=False)
#     tenor = models.BooleanField(default=False)
#     baritone = models.BooleanField(default=False)
#     bass = models.BooleanField(default=False)
