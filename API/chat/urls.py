from django.contrib import admin
from chat import views
from django.urls import path, include


urlpatterns = [
    path("<str:sender>/<str:receiver>/", views.message_view),
    path("contacts/all/<str:profile>/", views.contact_list),
    path("message/new", views.new_message),
]
