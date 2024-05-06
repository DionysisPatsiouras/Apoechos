from django.contrib import admin
from django.urls import path
from profiles import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [

    path("everything/", views.all_profiles),
    # MUSICIAN
    path("musicians/", views.all_musicians),
    path("musicians/add/", views.add_musician),
    path("musician/<str:id>/", views.musician_by_id),
    path("musician/patch/<str:id>/", views.updateMusician),
    # Stores
    path("stores/", views.all_stores),
    path("stores/<str:id>/", views.store_by_id),
    # Stages
    path("stages/", views.all_stages),
    path("stages/<int:id>/", views.stage_by_id),
    # Studios
    path("studios/", views.all_studios),
    path("studios/add/", views.add_studio),
    path("studio/<str:id>/", views.studio_by_id),
    path("studio/patch/<str:id>/", views.updateStudio),
    # cities
    path("test/", views.test),

]
