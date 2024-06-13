

from rest_framework import serializers
from .models import *
from profiles.models import *



class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='name', queryset=Profile.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='name', queryset=Profile.objects.all())

    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'message', 'timestamp']