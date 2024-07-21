from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse


@api_view(["GET"])
def message_view(request, sender, receiver):

    messages = Message.objects.filter(
        Q(sender_id=sender, receiver_id=receiver)
        | Q(sender_id=receiver, receiver_id=sender)
    )
    serializer = MessageSerializer(messages, many=True, context={"request": request})
    for message in messages:
        message.is_read = True
        message.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def contact_list(request, profile):

    # profile = "PROFILE4494356524428"

    messages = Message.objects.filter(
        Q(sender_id=profile) | Q(receiver_id=profile)
    ).values_list("sender_id", "receiver_id")

    contact_ids = set()
    for sender_id, receiver_id in messages:
        if sender_id != profile:
            contact_ids.add(sender_id)
        if receiver_id != profile:
            contact_ids.add(receiver_id)

    # # Retrieve profiles for these contact IDs
    contacts = Profile.objects.filter(profileId__in=contact_ids)

    # # Serialize the profiles
    serializer = Profile_Post_Serializer(contacts, many=True)
    
    return Response(serializer.data)
   
