from django.contrib import admin
from django.urls import path
from profiles import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [

    path("everything/", views.all_profiles2),
    path("all/", views.all_profiles), # /profiles/all/
    path("new/", views.new_profile),  # /profiles/new/
    # path("<str:id>/", views.store_by_id),  # /store/:id/
    # path("services/all", views.all_services),  # /store/services/
    # path("services/all/123", views.all_services123),  # /store/services/



]
