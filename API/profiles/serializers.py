from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class CitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):

    city = CitiesSerializer(many=False)
    category = CategorySerializer(many=False)

    class Meta:
        model = Profile
        fields = "__all__"


class New_Profile_Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = "__all__"
