from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer, UpdateUserSerializer
from .models import CustomUser

from rest_framework import status
from django.contrib.auth.hashers import make_password

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse


# /user/register
# CREATE USER'S ACCOUNT   
@api_view(['POST'])
@permission_classes([])
def register_user(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        password = serializer.validated_data.get('password')
        serializer.validated_data['password']=make_password(password)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /user/
# GET ALL USERS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# /user/me/
# GET ME
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


        


# /user/update/
# UPDATE MY PROFILE
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateMe(request):
    user = request.user
    serializer = UpdateUserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():

        if(serializer.validated_data.get('password')):
            password = serializer.validated_data.get('password')
            serializer.validated_data['password']=make_password(password)
            
        serializer.save()

        return JsonResponse({
            "message" : "Updated Successfully",
            "status" : 200,
            "updated" : 
                request.data
            })
    else:

    # return Response(request.data)
        return JsonResponse({
            "message" : "Bad request",
            "status" : 400,
            "request" : 
                request.data
            })