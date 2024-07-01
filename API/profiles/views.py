# from profile import Profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from users import serializers
from .serializers import *
from .models import *


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse


# /profile/all/
@api_view(["GET"])
@permission_classes([])
def all_profiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])


# /profile/new/
@api_view(["POST"])
def new_profile(request):
    serializer = New_Profile_Serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /profile/<str:id>/
@api_view(["GET"])
@permission_classes([])
def profile_by_id(request, id):

    try:
        profile = Profile.objects.get(pk=id)
    except Profile.DoesNotExist:
        return Response({"message": "Profile not exist", "status": 404})

    serializer = ProfileSerializer(profile)

    return Response(serializer.data)


# /profile/update/:id/
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile(request, id):
    user = request.user

    try:
        profile = Profile.objects.get(pk=id)
    except Profile.DoesNotExist:
        return Response({"message": "Profile not found!"})

    serializer = New_Profile_Serializer(profile, data=request.data, partial=True)

    if serializer.is_valid():
        if user.id == profile.user_id:
            serializer.save()
            return Response(
                {
                    "message": "ok",
                    "status": 200,
                    "message": "Updated Successfully!",
                    "updated entities": request.data,
                }
            )
        else:
            return Response(
                {
                    "message": "You don't have permission",
                }
            )


# /profile/get/cities/
@api_view(["GET"])
@permission_classes([])
def get_cities(request):

    cities = City.objects.all()
    serializer = CitiesSerializer(cities, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])


# /profile/get/genres/
@api_view(["GET"])
@permission_classes([])
def get_genres(request):

    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])

# /profile/get/my_profiles/
@api_view(["GET"])
def get_my_profiles(request):
    user = request.user

    profiles = Profile.objects.filter(user_id=user)
    serializer = ProfileSerializer(profiles, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])

# /profile/get/studio_services/
@api_view(["GET"])
@permission_classes([])
def get_studio_services(request):

    studio_service = Studio_Service.objects.all()
    serializer = Studio_Services_Serializers(studio_service, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])

# /profile/get/store_services/
@api_view(["GET"])
@permission_classes([])
def get_store_services(request):

    store_service = Store_Service.objects.all()
    serializer = Studio_Services_Serializers(store_service, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])

# /profile/get/instruments/
@api_view(["GET"])
@permission_classes([])
def get_instruments(request):

    instruments = Instrument.objects.all()
    serializer = InstrumentSerializer(instruments, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])


# /profile/get/get_categories/
@api_view(["GET"])
@permission_classes([])
def get_categories(request):

    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data)

