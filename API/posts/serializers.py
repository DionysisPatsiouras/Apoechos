from rest_framework import serializers
from .models import *
from profiles.serializers import Profile_Post_Serializer


class TitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post_Title
        fields = "__all__"


class NoIdTitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post_Title
        exclude = ("id",)


class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):

 
    profile = Profile_Post_Serializer(many=False)

    title = NoIdTitleSerializer(many=False)

    class Meta:
        model = Post
        fields = "__all__"


class PatchPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
