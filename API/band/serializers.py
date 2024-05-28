from rest_framework import serializers
from .models import *



class BandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Band
        fields = "__all__"


# class New_Stage_Serializer(serializers.ModelSerializer):

#     class Meta:
#         model = Stage
#         fields = "__all__"