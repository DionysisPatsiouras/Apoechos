from django.contrib import admin
from django.urls import path
from posts import views
from django.urls import path, include



urlpatterns = [
    path('all_posts/', views.all_posts),
    path('add/', views.add_post),
    path('<str:id>/', views.post_by_profile_id),
    path('post/<str:id>/', views.post_by_id)
]
