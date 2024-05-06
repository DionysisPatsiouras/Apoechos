from rest_framework import serializers
from .models import *
from rest_framework.validators import UniqueValidator





class SongSerializer(serializers.ModelSerializer):
    class Meta:
      model = Song
      fields = ('name',)


class InstrumentsSerializer(serializers.ModelSerializer):
    class Meta:
      model = Instrument
      fields = ('name',)





class MusicianSerializer(serializers.ModelSerializer):

    songs = SongSerializer(many=True)
    instruments = InstrumentsSerializer(many=True)

    class Meta:
        model = Musician
        fields = "__all__"



class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = "__all__"



class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = "__all__"


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = "__all__"


