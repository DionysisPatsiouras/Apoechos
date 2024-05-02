from rest_framework import serializers
from .models import *


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PatchPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ("post_id", "profile_id", "created_at")
