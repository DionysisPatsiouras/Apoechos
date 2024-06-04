from rest_framework import serializers
from .models import *



class AddServicesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"
       
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("name", )

class StudioSerializer(serializers.ModelSerializer):

    services = ServicesSerializer(many=True)

    class Meta:
        model = Studio
        fields = "__all__"


class New_Studio_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Studio
        fields = "__all__"


class Studio_Posts_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Studio
        fields = ("studioId", "title", "photo", )
        