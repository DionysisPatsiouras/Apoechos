from django.contrib import admin
from django.urls import path
from profiles import views

from django.urls import path, include
from profiles.views import MusicianViewset, StudioViewset
from rest_framework.routers import DefaultRouter


# http://127.0.0.1:8000/profiles/musician/1
router = DefaultRouter()
router.register("musician", MusicianViewset)
router.register("studio", StudioViewset)

urlpatterns = [
    path("", include(router.urls)),
    path("everything/", views.all_profiles),
    path("musicians/", views.musicians_list),
    # All profiles
    path("everything/", views.all_profiles),
    path("bands/", views.bands_list),
    # Musician CRUD
    path("musicians/", views.musicians_list),
    path("musicians/add/", views.post_musician),
    # By ID

    path("test/<int:id>", views.test),
    # By ID
    path("cities/", views.cities),
]


