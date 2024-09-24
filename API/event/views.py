from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
import datetime

from django.db.models import Q

from datetime import timedelta, datetime


# /event/
@api_view(["GET"])
@permission_classes([])
def all_events(request):

    events = (
        Event.objects.filter(is_deleted=False).order_by("date")
        # __lt stands for "less than"
        # this line excludes the previous days, but keep the current day
        .exclude(date__lt=datetime.today())
        # this line of code excludes previous days but keeps today AND yesterday
        # .exclude(date__lte=datetime.today() - timedelta(days=1))
    )
    serializer = EventSerializer(events, many=True)

    return Response(serializer.data)


# /event/new/
@api_view(["POST"])
def new_event(request):
    serializer = New_Event_Serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Created", "status": 201, "data": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /event/update/:id
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_event(request, id):

    # user = request.user

    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = New_Event_Serializer(event, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Updated", "status": 204, "data": request.data},
            status=status.HTTP_202_ACCEPTED,
        )
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # return Response(serializer.data)


# /event/<str:id>/
@api_view(["GET"])
def event_by_id(request, id):

    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = EventSerializer(event)

    return Response(serializer.data)


# /event/profile/<str:id>/
@api_view(["GET"])
def event_by_profile(request, id):

    try:
        event = Event.objects.filter(
            Q(created_by=id) | Q(profile_location=id), is_deleted=False
        )

    except Event.DoesNotExist:
        return Response(["Message", "Profile not exist!"])

    serializer = EventSerializer(event, many=True)

    return Response([{"length": len(serializer.data)}, serializer.data])
