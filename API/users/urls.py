
from django.urls import path
from users import views


urlpatterns = [
    path('', views.all_users),
    path('register/', views.register_user),
    path('me/', views.me),
    path('patch/', views.updateMe)
]
