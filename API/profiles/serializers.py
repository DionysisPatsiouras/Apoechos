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




class MusicianSerializer(serializers.ModelSerializer):

    # genres = GenreSerializer()

    class Meta:
        model = Musician
        # choose which data will be includes in the API
        fields = '__all__'
        # exclude = ('user', )
        # fields = ['artistic_nickname', 'city' ]

    # # create nested object
    # def create(self, validated_data):
    #     genres = validated_data.pop('genres')
    #     musician_instance = Musician.objects.create(**validated_data)
    #     for genre in genres:
    #         Genre.objects.create(user=musician_instance,**genre)
    #     return musician_instance


class Cities(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'
   





