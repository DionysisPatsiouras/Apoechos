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

class StageSerializer(serializers.ModelSerializer):

    # instruments = InstrumentSerializer(many=True)

    class Meta:
        model = Stage
        fields = "__all__"


class New_Stage_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Stage
        fields = "__all__"