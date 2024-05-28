from django.contrib import admin
from band import views
from django.urls import path, include


urlpatterns = [
    path("", views.all_bands),  # /band
    # path("new/", views.new_store),  # /store/new/
    # path("<str:id>/", views.stage_by_id),  # /stage/:id/
    # path("patch/<str:id>/", views.update_store), # /store/patch/:id/

    # path("instrument/add/", views.add_instrument) # /musician/instrument/add/
]
