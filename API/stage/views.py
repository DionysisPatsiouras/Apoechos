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