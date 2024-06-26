from rest_framework import serializers
from .models import *
from profiles.serializers import *



class New_Event_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    created_by = Profile_Post_Serializer(many=False)
    main_bands = Profile_Post_Serializer(many=True)
    support_acts = Profile_Post_Serializer(many=True)
    # profile_location = New_Profile_Serializer(many=False)

    class Meta:
        model = Event
        fields = "__all__"
