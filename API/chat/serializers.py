from rest_framework import serializers
from .models import *
from profiles.models import *
from profiles.serializers import *


class NewMessageSerializer(serializers.ModelSerializer):


    class Meta:
        model = Message
        fields = "__all__"

class MessageSerializer(serializers.ModelSerializer):

    sender = Profile_Post_Serializer(many=False)
    receiver = Profile_Post_Serializer(many=False)

    class Meta:
        model = Message
        fields = "__all__"
