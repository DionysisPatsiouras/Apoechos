from django.contrib import admin

from profiles.models import *
from posts.models import *
from musician.models import *
from studios.models import *
from store.models import *
from event.models import *



admin.site.register(Store)

admin.site.register(Post)

admin.site.register(Musician)
admin.site.register(Instrument)

admin.site.register(Studio)
admin.site.register(Service)
admin.site.register(Event)
