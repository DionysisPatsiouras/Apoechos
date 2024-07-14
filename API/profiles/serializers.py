from rest_framework import serializers
from .models import *
from users.serializers import *

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = "__all__"


class Studio_Services_Serializers(serializers.ModelSerializer):
    class Meta:
        model = Studio_Service
        fields = "__all__"


class Store_Services_Serializers(serializers.ModelSerializer):
    class Meta:
        model = Store_Service
        fields = "__all__"


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


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
    genres = GenreSerializer(many=True)
    instruments = InstrumentSerializer(many=True)
    studio_services = Studio_Services_Serializers(many=True)
    user = UserIsActiveSerializer(many=False)

    class Meta:
        model = Profile
        fields = "__all__"  


class New_Profile_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"


class Profile_Post_Serializer(serializers.ModelSerializer):

    category = CategorySerializer(many=False)

    class Meta:
        model = Profile
        fields = (
            "profileId",
            "photo",
            "name",
            "category",
        )

class Profile_Event_Serializer(serializers.ModelSerializer):

    city = CitiesSerializer(many=False)

    class Meta:
        model = Profile
        fields = ("profileId", "photo", "name", "city", "address")