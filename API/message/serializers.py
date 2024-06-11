from rest_framework import serializers
from .models import *

from musician.serializers import Musician_Posts_Serializer
from studios.serializers import Studio_Posts_Serializer
from store.serializers import Store_Posts_Serializer
from stage.serializers import Stage_Posts_Serializer
from band.serializers import Band_Posts_Serializer




class MessageSerializer(serializers.ModelSerializer):

    sender = Musician_Posts_Serializer(many=False)
    receiver = Musician_Posts_Serializer(many=False)
    # studio = Studio_Posts_Serializer(many=False)
    # store = Store_Posts_Serializer(many=False)
    # stage = Stage_Posts_Serializer(many=False)
    # band = Band_Posts_Serializer(many=False)


    class Meta:
        model = Message
        fields = "__all__"

