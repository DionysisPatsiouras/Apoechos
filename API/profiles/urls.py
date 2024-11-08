from django.urls import path
from profiles import views


urlpatterns = [

    path("all/", views.all_profiles), # /profiles/all/
    path("all/stages/", views.all_stages), # /profiles/all/stages
    path("new/", views.new_profile),  # /profiles/new/
    path("<str:id>/", views.profile_by_id),  # /profiles/<str:id>/
    path("update/<str:id>/", views.update_profile),  # /profiles/update/<str:id>/
    path("get/cities/", views.get_cities),  # /profiles/get/cities/
    path("get/genres/", views.get_genres),  # /profiles/get/genres/
    path("get/instruments/", views.get_instruments),  # /profiles/get/instruments/
    path("get/studio_services/", views.get_studio_services),  # /profiles/get/studio_services/
    path("get/store_services/", views.get_store_services),  # /profiles/get/store_services/
    path("get/my_profiles/", views.get_my_profiles),  # /profiles/get/my_profiles/
    path("get/categories/", views.get_categories),  # /profiles/get/categories/
    path("get/all_performers/", views.get_bands_and_musicians),  # /profiles/get/bands_and_musicians/
    
]
