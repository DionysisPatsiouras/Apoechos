from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


# /stage/
@api_view(["GET"])
def all_stages(request):

    stages = Stage.objects.all()
    serializer = StageSerializer(stages, many=True)

    return Response(serializer.data)


# /stage/<str:id>/
@api_view(["GET"])
def stage_by_id(request, id):

    try:
        store = Stage.objects.get(pk=id)
    except Stage.DoesNotExist:

        return Response({"message": "Stage not exist", "status": 404})

    serializer = StageSerializer(store)

    return Response(serializer.data)
