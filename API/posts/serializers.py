from rest_framework import serializers
from .models import *
from musician.serializers import *
from musician.models import *

from studios.serializers import *
from studios.models import *


class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):

    musician = New_Musician_Serializer(many=False)
    studio = New_Studio_Serializer(many=False)

    class Meta:
        model = Post
        fields = "__all__"


class PatchPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ("post_id", "profile_id", "created_at")
