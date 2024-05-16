from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


# /store/
@api_view(["GET"])
def all_stores(request):

    stores = Store.objects.all()
    serializer = StoreSerializer(stores, many=True)

    return Response(serializer.data)


# /store/new/
@api_view(["POST"])
def new_store(request):
    serializer = New_Store_Serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /store/<str:id>/
@api_view(["GET"])
def store_by_id(request, id):

    try:
        store = Store.objects.get(pk=id)
    except Store.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = StoreSerializer(store)

    return Response(serializer.data)


# # /musician/patch/:id/
# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def update_musician(request, id):
#     user = request.user

#     try:
#         musician = Musician.objects.get(pk=id)
#     except Musician.DoesNotExist:
#         return Response({"message": "Musician not found!"})

#     serializer = MusicianSerializer(musician, data=request.data, partial=True)

#     if serializer.is_valid():
#         if user.id == musician.user_id:
#             serializer.save()
#             return Response(
#                 {
#                     "message": "ok",
#                     "status": 200,
#                     "message": "Updated Successfully!",
#                     "updated entities": request.data,
#                 }
#             )
#         else:
#             return Response(
#                 {
#                     "message": "You don't have permission",
#                 }
#             )


