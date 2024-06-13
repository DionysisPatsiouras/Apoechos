from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *

# Create your views here.

@api_view(["GET"])
def message_view(request, sender, receiver):
    if request.method == "GET":
        messages = Message.objects.filter(
            sender_id=sender, receiver_id=receiver
        )
        serializer = MessageSerializer(
            messages, many=True, context={"request": request}
        )
        for message in messages:
            message.is_read = True
            message.save()
        return Response(serializer.data)
