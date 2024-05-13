from django.contrib import admin
from django.urls import path
from studios import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("", views.all_studios),  # /studio
    path("new/", views.new_studio),  # /studio/new/
    path("<str:id>/", views.studio_by_id),  # /studio/:id/
    path("patch/<str:id>/", views.update_studio),  # /studio/patch/:id/

    path("service/add/", views.add_service),  # /studio/service/add/
]
