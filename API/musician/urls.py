from django.contrib import admin
from django.urls import path
from musician import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("", views.all_musicians),  # /musician
    path("new/", views.new_musician),  # /musician/new/
    path("<str:id>/", views.musician_by_id),  # /musician/:id/
    path("patch/<str:id>/", views.update_musician), # /musician/patch/:id/
]
