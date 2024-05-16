from django.contrib import admin
from musician import views
from django.urls import path, include



urlpatterns = [
    path("", views.all_musicians),  # /musician
    path("new/", views.new_musician),  # /musician/new/
    path("<str:id>/", views.musician_by_id),  # /musician/:id/
    path("patch/<str:id>/", views.update_musician), # /musician/patch/:id/

    path("instrument/add/", views.add_instrument) # /musician/instrument/add/
]
