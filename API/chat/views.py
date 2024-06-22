from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.db.models import Q

# Create your views here.


@api_view(["GET"])
def message_view(request, sender, receiver):
   

    messages = Message.objects.filter(
        Q(sender_id=sender, receiver_id=receiver)
        | Q(sender_id=receiver, receiver_id=sender)
    )
    serializer = MessageSerializer(
        messages, many=True, context={"request": request}
    )
    for message in messages:
        message.is_read = True
        message.save()
    return Response(serializer.data)
