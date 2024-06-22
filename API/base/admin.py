from django.contrib import admin

from profiles.models import *
from posts.models import *
from event.models import *
from chat.models import *


admin.site.register(Post)
admin.site.register(Post_Title)


admin.site.register(Event)


admin.site.register(Profile)
admin.site.register(Category)

admin.site.register(City)
admin.site.register(Genre)
admin.site.register(Studio_Service)
admin.site.register(Store_Service)


admin.site.register(Message)
