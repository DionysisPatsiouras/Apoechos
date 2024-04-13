from django.contrib import admin
from django.urls import path
from profiles import views

from django.urls import path, include

# from profiles.views import MusicianViewset, StudioViewset
# from profiles.views import MusicianViewset
from rest_framework.routers import DefaultRouter


# http://127.0.0.1:8000/profiles/musician/1
# router = DefaultRouter()
# router.register("musician", MusicianViewset)
# router.register("studio", StudioViewset)

urlpatterns = [
    # path("", include(router.urls)),
    path("everything/", views.all_profiles),
    # MUSICIAN
    path("musicians/", views.all_musicians),
    path("musicians/add/", views.add_musician),
    path("musician/<str:id>/", views.musician_by_id),
    path("musician/patch/<str:id>/", views.updateMusician),
    
    # path("musicians/patch/", views.updateMusician),
    # Stores
    path("stores/", views.all_stores),
    path("stores/<str:id>/", views.store_by_id),
    # Stages
    path("stages/", views.all_stages),
    path("stages/<int:id>/", views.stage_by_id),
    # random
    path("test/<int:id>", views.test),
    path("cities/", views.cities),
]

