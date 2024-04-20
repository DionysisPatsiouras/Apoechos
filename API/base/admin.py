from django.contrib import admin

from profiles.models import *
from genre.models import Genre



admin.site.register(Musician)
admin.site.register(MusicianGenre)
admin.site.register(Studio)
admin.site.register(Store)
admin.site.register(Stage)



admin.site.register(Genre)
admin.site.register(City)
admin.site.register(Instrument)
admin.site.register(MusicianInstrument)
admin.site.register(Song)
