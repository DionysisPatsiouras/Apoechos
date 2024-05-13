from django.shortcuts import render
from profile import Profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from users import serializers
from .serializers import *
from .models import *


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# from django.http import JsonResponse


# /studio/
@api_view(["GET"])
def all_studios(request):

    studios = Studio.objects.all()
    serializer = StudioSerializer(studios, many=True)

    return Response(serializer.data)


# /studio/new/
@api_view(["POST"])
def new_studio(request):
    serializer = New_Studio_Serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /studio/<str:id>/
@api_view(["GET"])
def studio_by_id(request, id):

    try:
        studio = Studio.objects.get(pk=id)
    except Studio.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = StudioSerializer(studio)

    return Response(serializer.data)


# /studio/patch/:id/
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_studio(request, id):
    user = request.user

    try:
        studio = Studio.objects.get(pk=id)
    except Studio.DoesNotExist:
        return Response({"message": "Studio not found!"})

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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_service(request):

    serializer = AddServicesSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)