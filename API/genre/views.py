from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import GenreSerializer
from .models import Genre
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

# /genre/
# GET ALL GENRES
@api_view(['GET'])
def all_genres(request):
    
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)