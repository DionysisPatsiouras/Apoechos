from rest_framework import serializers
from .models import CustomUser
from rest_framework.validators import UniqueValidator




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields = '__all__'
        exclude = ('groups', 'user_permissions')

        extra_kwargs = {
            "email": {
                "validators" : [
                    UniqueValidator(
                        queryset=CustomUser.objects.all(),
                        message="Email already in use"
                    )
                ]
            },
            # "password": {'write_only': True, 'min_length': 8}
        }


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields = '__all__'
        fields = ("password", "last_login", "id", "email",)

        # extra_kwargs = {

        #     "password": {'write_only': True, 'min_length': 8}
        # }


class UserIsActiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('is_active', 'id', )