from django.contrib import admin
from store import views
from django.urls import path, include



urlpatterns = [
    path("", views.all_stores),  # /store
    path("new/", views.new_store),  # /store/new/
    path("<str:id>/", views.store_by_id),  # /store/:id/
    # path("patch/<str:id>/", views.update_store), # /store/patch/:id/

    # path("instrument/add/", views.add_instrument) # /musician/instrument/add/
]
