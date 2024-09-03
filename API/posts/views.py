from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from profiles.models import *

from django.utils import timezone


current_date = timezone.now()

# /posts/titles/all/
@api_view(["GET"])
def all_titles(request):

    posts = Post_Title.objects.all()
    serializer = TitleSerializer(posts, many=True)

    return Response(serializer.data)

# /posts/all_posts
@api_view(["GET"])
def all_posts(request):

    posts = Post.objects.filter(is_deleted=False).order_by('created_at')
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


# /posts/new
@api_view(["POST"])
def new_post(request):
    serializer = NewPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /posts/:profile_id
@api_view(["GET"])
def post_by_profile_id(request, id):

    try:
        post = Post.objects.filter(profile=id).filter(is_deleted=False)
    except Post.DoesNotExist:
        return Response(["Message", "Profile not exist!"])

    serializer = PostSerializer(post, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])


# /posts/update/:postId
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_post(request, id):

    user = request.user

    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response(["error", "not exist"])

   
    serializer = PatchPostSerializer(post, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)







