from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


# /event/
@api_view(["GET"])
@permission_classes([])
def all_events(request):

    events = Event.objects.all()
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


# /event/<str:id>/
@api_view(["GET"])
def event_by_id(request, id):

    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = EventSerializer(event)

    return Response(serializer.data)



# /event/patch/:id/
# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def update_event(request, id):
#     user = request.user

#     try:
#         musician = Event.objects.get(pk=id)
#     except Event.DoesNotExist:
#         return Response({"message": "Event not found!"})

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
# )
