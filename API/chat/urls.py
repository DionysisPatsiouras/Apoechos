from django.contrib import admin
from chat import views
from django.urls import path, include



urlpatterns = [
    path('<str:sender>/<str:receiver>/', views.message_view),

]