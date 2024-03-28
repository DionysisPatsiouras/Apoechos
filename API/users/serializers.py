from rest_framework import serializers
from .models import CustomUser
from rest_framework.validators import UniqueValidator

# exclude = ('is_staff', )


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
            }
        }

# I use this serializer to give only a few permission
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('password', 'musicianId')