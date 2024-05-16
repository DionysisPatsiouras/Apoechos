from django.contrib import admin
from event import views
from django.urls import path, include



urlpatterns = [
    path("", views.all_events),  # /event

    path("new/", views.new_event),  # /event/new/
    # path("<str:id>/", views.musician_by_id),  # /event/:id/
    # path("patch/<str:id>/", views.update_musician), # /event/patch/:id/
]
