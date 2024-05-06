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
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /profiles/musician/:id
@api_view(["GET"])
def musician_by_id(request, id):

    array = []

    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = MusicianSerializer(musician)

    genres = MusicianGenre.objects.filter(musicianId_id=id)
    # genreSerializer = MusGenres(genres, many=True)

    # for genre in range(len(genreSerializer.data)):
    #     array.append(genreSerializer.data[genre]["genreName"])

    return Response(serializer.data)
    # return Response(
    #     {
    #         "musicianId": serializer.data["musicianId"],
    #         "artistic_nickname": serializer.data["artistic_nickname"],
    #         "city": serializer.data["city"],
    #         "bio": serializer.data["bio"],
    #         "websiteLink": serializer.data["websiteLink"],
    #         "photo": serializer.data["photo"],
    #         "category": serializer.data["category"],
    #         "user_id": serializer.data["user"],
    #         "genres": array,
    #     }
    # )


# profiles/musician/patch/:id/
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def updateMusician(request, id):
    user = request.user

    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return JsonResponse({"message": "Musician not found"})

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


# /profiles/studios/
@api_view(["GET"])
def all_studios(request):

    studios = Studio.objects.all()
    serializer = StudioSerializer(studios, many=True)

    return Response(serializer.data)


# /profiles/studios/add/
@api_view(["POST"])
def add_studio(request):
    serializer = StudioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /profiles/studios/:id
@api_view(["GET"])
def studio_by_id(request, id):

    # array = []

    try:
        studio = Studio.objects.get(pk=id)
    except Musician.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = StudioSerializer(studio)


    return Response(serializer.data)
    # return Response(
    #     {
    #         "studioId": serializer.data["studioId"],
    #         "title": serializer.data["title"],
    #         "city": serializer.data["city"],
    #         "address": serializer.data["address"],
    #         # "websiteLink": serializer.data["websiteLink"],
    #         "photo": serializer.data["photo"],
    #         "category": serializer.data["category"],
    #         "user_id": serializer.data["user"],
    #         # "genres": array,
    #     }
    # )

# profiles/studios/patch/:id/
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def updateStudio(request, id):
    user = request.user

    try:
        studio = Studio.objects.get(pk=id)
    except Studio.DoesNotExist:
        return JsonResponse({"message": "Studio not found"})

    serializer = StudioSerializer(studio, data=request.data, partial=True)

    if serializer.is_valid():
        if user.id == studio.user_id:
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


@api_view(["GET"])
def mystats(request, id):

    user = request.user

    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return JsonResponse({"message": "Musician not found"})

    serializer = MusicianSerializer(musician, data=request.data, partial=True)

    if serializer.is_valid():

        if user.id == serializer.data["user"]:
            return Response(serializer.data)
        else:
            return Response([{"message": "You don't have permissions"}])


@api_view(["GET"])
def test(request):
    obj = MusInst.objects.all()

    serializer = MusInstSerializer(obj, many=True)

    return Response(serializer.data)