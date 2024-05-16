from rest_framework import serializers
from .models import *



# class AddInstrumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instrument
#         fields = "__all__"
       
# class InstrumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instrument
#         fields = ("name", )

class StoreSerializer(serializers.ModelSerializer):

    # instruments = InstrumentSerializer(many=True)

    class Meta:
        model = Store
        fields = "__all__"


class New_Store_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = "__all__"