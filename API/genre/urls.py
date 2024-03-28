from django.contrib import admin
from django.urls import path
from genre import views


from django.urls import path,include
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('', views.all_genres), 
]