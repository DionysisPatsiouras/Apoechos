from rest_framework import serializers
from .models import *

from musician.serializers import Musician_Posts_Serializer
from studios.serializers import Studio_Posts_Serializer
from store.serializers import Store_Posts_Serializer
from stage.serializers import Stage_Posts_Serializer


class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):

    musician = Musician_Posts_Serializer(many=False)
    studio = Studio_Posts_Serializer(many=False)
    store = Store_Posts_Serializer(many=False)
    stage = Stage_Posts_Serializer(many=False)


    class Meta:
        model = Post
        fields = "__all__"


class PatchPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ("post_id", "profile_id", "created_at")


