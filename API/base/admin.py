from django.contrib import admin

from profiles.models import *
from site_modules.models import SignatureColors
from genre.models import Genre



admin.site.register(Musician)
# admin.site.register(Band)
# admin.site.register(Studio)
# admin.site.register(Stage)
# admin.site.register(Store)

# admin.site.register(Instrument)

admin.site.register(SignatureColors)

admin.site.register(Genre)
admin.site.register(City)
