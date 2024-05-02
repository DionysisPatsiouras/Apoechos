from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# /posts/all_posts
@api_view(["GET"])
def all_posts(request):

    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


# /posts/add
@api_view(["POST"])
def add_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /posts/:profile_id
@api_view(["GET"])
def post_by_profile_id(request, id):

    try:
        post = Post.objects.all().filter(profile_id=id)
    except Post.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = PostSerializer(post, many=True)

    return Response(serializer.data)


# /posts/post/:postId
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def post_by_id(request, id):

    user = request.user

    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response(["error", "not exist"])

    # serializer = PostSerializer(post)
    serializer = PatchPostSerializer(post, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        # if user.id == musician.user_id:
        #     serializer.save()
        #     return Response(
        #         {
        #             "message": "ok",
        #             "status": 200,
        #             "message": "Updated Successfully!",
        #             "updated entities": request.data,
        #         }
        #     )
        # else:
        #     return Response(
        #         {
        #             "message": "You don't have permission",
        #         }
        #     )

    return Response(serializer.data)



