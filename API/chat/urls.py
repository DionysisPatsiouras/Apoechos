from django.contrib import admin
from chat import views
from django.urls import path, include


urlpatterns = [
    path("<str:sender>/<str:receiver>/", views.message_view), # chat/:id/:id/
    path("contacts/all/<str:profile>/", views.contact_list), # chat/contacts/all/:id/
    path("message/new", views.new_message), # chat/message/new
]
