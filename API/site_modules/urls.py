from django.contrib import admin
from django.urls import path
from site_modules import views

urlpatterns = [
    path('signature_colors/', views.signature_colors),


]