from profile import Profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from users import serializers
from .serializers import *
from .models import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse




# /profiles/musicians/
@api_view(["GET"])
def all_musicians(request):
    musicians = Musician.objects.all()
    serializer = MusicianSerializer(musicians, many=True)
    return Response(serializer.data)


# /profiles/musicians/add/
@api_view(["POST"])
def add_musician(request):
    serializer = MusicianSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /profiles/musician/:id
@api_view(["GET"])
def musician_by_id(request, id):
    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return Response(["error", "not exist"])

    if request.method == "GET":
        serializer = MusicianSerializer(musician)
        return Response(serializer.data)


# profiles/musician/patch/:id/
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def updateMusician(request, id):
    user = request.user

    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return JsonResponse({"message": "Musician Id not found"})

    serializer = MusicianSerializer(musician, data=request.data, partial=True)

    if serializer.is_valid():
        if user.id == musician.user_id:
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


# POST NEW GENRE
@api_view(["POST"])
def post_genre(request):

    serializer = GenreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            [
                {
                    "message": "Successfully Created!",
                    "status": 201,
                    "data": serializer.data,
                }
            ]
        )
    else:
        return Response(serializer.errors)


@api_view(["GET"])
def genre_by_id(request, id):
    try:
        genre = Genre.objects.get(pk=id)
    except Genre.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GenreSerializer(genre)
        return Response(serializer.data)


@api_view(["GET"])
def test(request, id):

    try:
        musicianId = MusicianGenre.objects.get(pk=musicianId)
    except MusicianGenre.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    test = MusicianGenre.objects.all()
    # serializer = MusGenres(test)
    serializer = MusGenres(test, many=True)

    try:
        musician = MusicianGenre.objects.get(musicianId=id)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = MusicianSerializer(musician)
        return Response(serializer.data)

    # return Response(

    #     [serializer.data[0]['musicianId']] +
    #     [serializer.data[1]['musicianId']]

    #     )

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([])
def cities(request):
    cities = City.objects.all()
    serializer = Cities(cities, many=True)
    return Response(serializer.data)


# profiles/everything/
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_profiles(request):
    musicians = Musician.objects.all()
    studios = Studio.objects.all()
    stores = Store.objects.all()

    musician_serializer = MusicianSerializer(musicians, many=True)
    studio_serializer = StudioSerializer(studios, many=True)
    store_serializer = StoreSerializer(stores, many=True)

    return Response(
        [
            {
                "message": "OK",
                "status": 200,
                "length": len(
                    musician_serializer.data
                    + studio_serializer.data
                    + store_serializer.data
                ),
                "everything": musician_serializer.data
                + studio_serializer.data
                + store_serializer.data,
                "musicians": musician_serializer.data,
                "studios": studio_serializer.data,
                "stores": store_serializer.data,
            }
        ]
    )


# profiles/stores/
@api_view(["GET"])
def all_stores(request):
    stores = Store.objects.all()
    serializer = StoreSerializer(stores, many=True)
    return Response(serializer.data)


# profiles/stores/:id/
@api_view(["GET"])
def store_by_id(request, id):

    try:
        storeId = Store.objects.get(pk=id)
    except Store.DoesNotExist:
        # return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(["error", "not exist"])

    if request.method == "GET":
        serializer = StoreSerializer(storeId)
        return Response(serializer.data)


# STUDIOS
@api_view(["GET", "POST"])
def studios_list(request):
    if request.method == "GET":
        studios = Studio.objects.all()
        serializer = StudioSerializer(studios, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = StudioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


@api_view(["GET"])
def all_stages(request):
    stages = Stage.objects.all()
    serializer = StageSerializer(stages, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def stage_by_id(request, id):

    try:
        stageId = Stage.objects.get(pk=id)
    except Stage.DoesNotExist:
        # return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(["error", "not exist"])

    if request.method == "GET":
        serializer = StageSerializer(stageId)
        return Response(serializer.data)
