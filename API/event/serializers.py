from rest_framework import serializers
from .models import *


class New_Event_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"
