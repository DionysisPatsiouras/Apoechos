from rest_framework import serializers
from .models import *


# INSTRUMENTS
class AddInstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = "__all__"


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ("name",)


# GENRES
class AddGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ("name",)


# MUSICIAN
class MusicianSerializer(serializers.ModelSerializer):

    instruments = InstrumentSerializer(many=True)
    genres = GenreSerializer(many=True)

    class Meta:
        model = Musician
        fields = "__all__"


class New_Musician_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Musician
        fields = "__all__"
