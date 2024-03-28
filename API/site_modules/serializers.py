from rest_framework import serializers
from .models import SignatureColors


class SignatureColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignatureColors
        fields = '__all__'
