from rest_framework import serializers
from .models import *

class AddInstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = "__all__"


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ("name",)


class MusicianSerializer(serializers.ModelSerializer):

    instruments = InstrumentSerializer(many=True)

    class Meta:
        model = Musician
        fields = "__all__"


class New_Musician_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Musician
        fields = "__all__"
