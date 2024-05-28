from django.contrib import admin
from django.urls import path
from profiles import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [

    path("everything/", views.all_profiles),



]
