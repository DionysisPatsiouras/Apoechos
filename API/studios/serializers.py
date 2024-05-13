from rest_framework import serializers
from .models import *



# class AddInstrumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instrument
#         fields = "__all__"
       
# class InstrumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instrument
#         fields = ("name", )

class StudioSerializer(serializers.ModelSerializer):

    # services = ServicesSerializer(many=True)

    class Meta:
        model = Studio
        fields = "__all__"


class New_Studio_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Studio
        fields = "__all__"