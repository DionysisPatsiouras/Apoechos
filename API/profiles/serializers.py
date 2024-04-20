from rest_framework import serializers
from .models import *
from rest_framework.validators import UniqueValidator

# class GenreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Genre
#         # fields = '__all__'
#         exclude = ('id', )

#         extra_kwargs = {
#             "user_id": {
#                 "validators" : [
#                     UniqueValidator(
#                         queryset=Genre.objects.all(),
#                         message="user_id already in use"
#                     )
#                 ]
#             }
#         }


class MusGenres(serializers.ModelSerializer):
    class Meta:
        model = MusicianGenre
        fields = "__all__"


class SongSerializer(serializers.ModelSerializer):
    class Meta:
      model = Song
      fields = ('id', 'name')

class MusicianSerializer(serializers.ModelSerializer):

    songs = SongSerializer(many=True)

    class Meta:
        model = Musician
        # fields = "__all__"
        fields = ('musicianId', 'bio', 'artistic_nickname', 'city', 'photo', 'websiteLink', 'category', 'user', 'songs')

        # exclude = ('user', )
        # fields = ['artistic_nickname', 'city' ]



class InstrumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = "__all__"

class MusicianInstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicianInstrument
        fields = "__all__"

class TestSerializer(serializers.ModelSerializer):

    musician = InstrumentsSerializer()

    class Meta:
        model = Musician
        # fields = "__all__"
        fields = ('musicianId', 'bio', 'musician')



class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = "__all__"


class Cities(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = "__all__"


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = "__all__"


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = "__all__"
