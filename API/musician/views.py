from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


# /musician/
@api_view(["GET"])
def all_musicians(request):

    musicians = Musician.objects.all()
    serializer = MusicianSerializer(musicians, many=True)

    return Response(serializer.data)


# /musician/new/
@api_view(["POST"])
def new_musician(request):
    serializer = New_Musician_Serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /musician/<str:id>/
@api_view(["GET"])
def musician_by_id(request, id):

    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return Response({"message": "Musician not exist", "status": 404})

    serializer = MusicianSerializer(musician)

    return Response(serializer.data)


# /musician/patch/:id/
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_musician(request, id):
    user = request.user

    try:
        musician = Musician.objects.get(pk=id)
    except Musician.DoesNotExist:
        return Response({"message": "Musician not found!"})

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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_instrument(request):

    serializer = AddInstrumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_instrument(request, id):

    instrument = Instrument.objects.get(pk=id)
    instrument.delete()
    return Response({"message": "Instrument deleted"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_genre(request):

    serializer = AddGenreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


