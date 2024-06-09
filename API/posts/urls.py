from django.contrib import admin
from django.urls import path
from posts import views
from django.urls import path, include



urlpatterns = [
    path('all_posts/', views.all_posts), # posts/all_posts/
    path('new/', views.new_post), # posts/new/
    path('<str:id>/', views.post_by_profile_id), # posts/:id/
    path('update/<str:id>/', views.update_post), # posts/update/:id
    path('titles/all/', views.all_titles) # posts/titles/all/
]
