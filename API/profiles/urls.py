from django.contrib import admin
from django.urls import path
from profiles import views


from django.urls import path,include
from profiles.views import MusicianViewset
from rest_framework.routers import DefaultRouter




# http://127.0.0.1:8000/profiles/musician/1
router = DefaultRouter()
router.register('musician', MusicianViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('everything/', views.all_profiles),

    path('musicians/', views.musicians_list),

    # All profiles
    path('everything/', views.all_profiles),
   
    path('bands/', views.bands_list),

    # Musician CRUD
    path('musicians/', views.musicians_list),
    path('musicians/add/', views.post_musician),


    # By ID
    path('musician/<int:id>', views.musician_by_id),


# By ID
    path('cities/', views.cities),

]


