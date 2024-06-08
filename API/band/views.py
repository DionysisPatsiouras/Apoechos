from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


# /band/
@api_view(["GET"])
def all_bands(request):

    bands = Band.objects.all()
    serializer = BandSerializer(bands, many=True)

    return Response(serializer.data)

# /band/<str:id>/
@api_view(["GET"])
def band_by_id(request, id):

    try:
        band = Band.objects.get(pk=id)
    except Band.DoesNotExist:
        return Response({"message": "Band not exist", "status": 404})

    serializer = BandSerializer(band)

    return Response(serializer.data)
