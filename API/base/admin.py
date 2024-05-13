from django.contrib import admin

from profiles.models import *
from genre.models import Genre
from posts.models import *
from musician.models import *
from studios.models import *



admin.site.register(Studio)
admin.site.register(Store)
admin.site.register(Stage)

admin.site.register(Genre)
admin.site.register(Post)

admin.site.register(Musician)
admin.site.register(Instrument)

