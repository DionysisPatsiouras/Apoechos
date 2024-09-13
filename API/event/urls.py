from django.contrib import admin
from event import views
from django.urls import path, include


urlpatterns = [
    path("all/", views.all_events),  # /event
    path("new/", views.new_event),  # /event/new/
    path("<str:id>/", views.event_by_id),  # /event/:id/
    path("profile/<str:id>/", views.event_by_profile),  # /event/profile:id/
    path("update/<str:id>/", views.update_event),  # /event/update/:id/
]
