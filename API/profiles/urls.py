from django.contrib import admin
from django.urls import path
from profiles import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [


    path("all/", views.all_profiles), # /profiles/all/
    path("new/", views.new_profile),  # /profiles/new/
    path("<str:id>/", views.profile_by_id),  # /profiles/<str:id>/
    path("update/<str:id>/", views.update_profile),  # /profiles/update/<str:id>/
    # path("services/all", views.all_services),  # /store/services/
    # path("services/all/123", views.all_services123),  # /store/services/



]
