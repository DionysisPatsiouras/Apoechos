from profile import Profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from users import serializers
from .serializers import *
from .models import *

from musician.models import *
from studios.models import *
from store.models import *
from stage.models import *
from band.models import *

from musician.serializers import *
from studios.serializers import *
from store.serializers import *
from stage.serializers import *
from band.serializers import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse



# POST NEW GENRE
@api_view(["POST"])
def post_genre(request):

    serializer = GenreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            [
                {
                    "message": "Successfully Created!",
                    "status": 201,
                    "data": serializer.data,
                }
            ]
        )
    else:
        return Response(serializer.errors)


@api_view(["GET"])
@permission_classes([])
def cities(request):
    cities = City.objects.all()
    serializer = Cities(cities, many=True)
    return Response(serializer.data)


# profiles/everything/
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_profiles(request):
    musicians = Musician.objects.all()
    studios = Studio.objects.all()
    stores = Store.objects.all()
    stages = Stage.objects.all()
    bands = Band.objects.all()

    musician_serializer = MusicianSerializer(musicians, many=True)
    studio_serializer = StudioSerializer(studios, many=True)
    store_serializer = StoreSerializer(stores, many=True)
    stage_serializer = StageSerializer(stages, many=True)
    band_serializer = BandSerializer(bands, many=True)

    return Response(
        [
            {
                "message": "OK",
                "status": 200,
                "length": len(
                    musician_serializer.data
                    + studio_serializer.data
                    + store_serializer.data
                    + stage_serializer.data
                    + band_serializer.data
                ),
                "everything": musician_serializer.data
                + studio_serializer.data
                + store_serializer.data
                + stage_serializer.data
                + band_serializer.data,
                "musicians": musician_serializer.data,
                "studios": studio_serializer.data,
                "stores": store_serializer.data,
                "stages": stage_serializer.data,
                "bands" : band_serializer.data

            }
        ]
    )


