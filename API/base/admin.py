from django.contrib import admin

from profiles.models import *
from genre.models import Genre



admin.site.register(Musician)
admin.site.register(MusicianGenre)


admin.site.register(Genre)
admin.site.register(City)
