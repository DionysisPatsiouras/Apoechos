from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

# /posts/all_posts
@api_view(["GET"])
def all_posts(request):

    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)

# /posts/add
@api_view(['POST'])
def add_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /posts/:profile_id
@api_view(["GET"])
def post_by_id(request, id):

    try:
        post =  Post.objects.all().filter(profile_id=id)
    except Post.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = PostSerializer(post, many=True)


    return Response(serializer.data)
    

