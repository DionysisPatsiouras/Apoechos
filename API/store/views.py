from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
def all_services(request):

    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)

    return Response(serializer.data)

@api_view(["GET"])
def all_services123(request):

    services = Store_Service.objects.all()
    serializer = StoreServiceSerializer(services, many=True)

    return Response(serializer.data)


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

        return Response({"message": "Store not exist", "status": 404})

    serializer = StoreSerializer(store)

    return Response(serializer.data)






