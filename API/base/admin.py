from django.contrib import admin

from profiles.models import *
from posts.models import *
from musician.models import *
from studios.models import *
from store.models import *
from stage.models import *
from event.models import *
from band.models import *
from message.models import *

# Musician
admin.site.register(Musician)
admin.site.register(Instrument)
admin.site.register(Genre)

# Studio
admin.site.register(Studio)
admin.site.register(Service)

# Stage
admin.site.register(Stage)

# Store
admin.site.register(Store)
admin.site.register(Store_Service)


# Band
admin.site.register(Band)


admin.site.register(Post)
admin.site.register(Event)
admin.site.register(Post_Title)

admin.site.register(Message)

admin.site.register(Profile)
admin.site.register(Category)