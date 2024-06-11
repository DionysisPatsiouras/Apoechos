from django.contrib import admin
from message import views
from django.urls import path, include



urlpatterns = [
    path('all/', views.all_messages), # messages/all/
    # path('new/', views.new_post), # posts/new/
    path('profile/<str:id>/', views.msg_by_id), # messages/:id/
    # path('update/<str:id>/', views.update_post), # posts/update/:id
    # path('titles/all/', views.all_titles) # posts/titles/all/
]
