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




class New_Store_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = "__all__"


class Store_Posts_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = ("storeId", "title", "photo", )


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = "__all__" 

class StoreSerializer(serializers.ModelSerializer):
    
    # store_service = StoreServiceSerializer(many=False)

    class Meta:
        model = Store
        fields = "__all__"




class StoreServiceSerializer(serializers.ModelSerializer):

    service = ServiceSerializer(many=False)
    store = StoreSerializer(many=False)

    class Meta:
        model = Store_Service
        fields = "__all__" 











        