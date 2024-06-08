from rest_framework import serializers
from .models import *



class BandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Band
        fields = "__all__"



class Band_Posts_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Band
        fields = ("bandId", "name", "photo", )
        