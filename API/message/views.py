from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

# /messages/all/
@api_view(["GET"])
def all_messages(request):

    msgs = Message.objects.all()
    serializer = MessageSerializer(msgs, many=True)

    return Response(serializer.data)


# /messages/profile/:musicianId
@api_view(["GET"])
def msg_by_id(request, id):

    try:
        msg = Message.objects.filter(Q(sender=id) | Q(receiver=id))
    except Message.DoesNotExist:
        return Response(["error", "not exist"])

    serializer = MessageSerializer(msg, many=True)

    return Response(serializer.data)
