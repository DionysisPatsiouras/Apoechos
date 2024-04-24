from django.contrib import admin
from django.urls import path
from posts import views
from django.urls import path, include



urlpatterns = [

    # path("everything/", views.all_profiles),
    # MUSICIAN

    path("all/", views.all_posts)


]
