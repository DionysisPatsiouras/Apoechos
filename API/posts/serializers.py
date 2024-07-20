from rest_framework import serializers
from .models import *
from profiles.serializers import Profile_Post_Serializer
from profiles.serializers import CategorySerializer

class TitleSerializer(serializers.ModelSerializer):

    categoryId = CategorySerializer(many=False)

    class Meta:
        model = Post_Title
        fields = "__all__"


# class NoIdTitleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post_Title
#         exclude = ("id",)


class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):

    profile = Profile_Post_Serializer(many=False)
    title = TitleSerializer(many=False)

    class Meta:
        model = Post
        fields = "__all__"


class PatchPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
