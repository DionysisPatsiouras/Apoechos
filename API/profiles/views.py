from profile import Profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from users import serializers
from .serializers import *
from .models import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated



class MusicianViewset(viewsets.ModelViewSet):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer
    # http_method_names = ['get','post','retrieve','put','patch']
    http_method_names = ['get']


# POST NEW GENRE
@api_view(['POST'])
def post_genre(request):

    serializer = GenreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response([
            {
                'message' : 'Successfully Created!',
                'status' : 201,
                'data': serializer.data
            }])
    else: 
        return Response(serializer.errors)

# not working properly
@api_view(['PATCH'])
def patch_genre(request):

    # user = Musician.objects.get(id=user_id)
    serializer = GenreSerializer(request.user, data=request.data, partial=True)
   

    if serializer.is_valid():
        serializer.save()
        return Response([
            {
                'message' : 'Successfully Updated!',
                'status' : 201,
                'data': serializer.data
            }])
    else: 
        return Response(serializer.errors)




# GET SPECIFIC MUSICIAN BY ID
@api_view(['GET'])
def musician_by_id(request, id):
    
    try:
        musician = Musician.objects.get(pk=id)
    except Profile.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    
    if request.method == 'GET':
        serializer = MusicianSerializer(musician)
        return Response(serializer.data)

    
@api_view(['POST'])
def post_musician(request):

    serializer = MusicianSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET', 'POST'])        
def bandById(request, id):
    try:
        band = Band.objects.get(pk=id)
    except Profile.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BandSerializer(band)
        return Response(serializer.data)


@api_view(['GET'])        
def genre_by_id(request, id):
    try:
        genre = Genre.objects.get(pk=id)
    except Profile.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GenreSerializer(genre)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([])
def cities(request):
    
    cities = City.objects.all()
    serializer = Cities(cities, many=True)
    return Response(serializer.data)





@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def all_profiles(request):
    musicians = Musician.objects.all()
    # bands = Band.objects.all()
    studios = Studio.objects.all()
    # stages = Stage.objects.all()
    # stores = Store.objects.all()
    

    serializer1 = MusicianSerializer(musicians, many=True)
    # serializer2 = BandSerializer(bands, many=True)
    serializer3 = StudioSerializer(studios, many=True)
    # serializer4 = StageSerializer(stages, many=True)
    # serializer5 = StoreSerializer(stores, many=True)
    # return Response(serializer1.data + serializer3.data)

    return Response([
            {
                'message' : 'OK',
                'status' : 200,
                'length' : len(serializer1.data + serializer3.data),
                'everything' : serializer1.data + serializer3.data,
                'musicians' : serializer1.data,
                'studios' : serializer3.data
            }])
    
    # return Response(serializer1.data + serializer2.data + serializer3.data + serializer4.data + serializer5.data)




# MUSICIANS
@api_view(['GET', 'POST'])
def musicians_list(request):

    if request.method == 'GET':
        musicians = Musician.objects.all()
        serializer = MusicianSerializer(musicians, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
       serializer = MusicianSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        




# BANDS
@api_view(['GET', 'POST'])
def bands_list(request):
    if request.method == 'GET':
        bands = Band.objects.all()
        serializer = BandSerializer(bands, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
       serializer = BandSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
    



# STUDIOS
@api_view(['GET', 'POST'])
def studios_list(request):
    if request.method == 'GET':
        studios = Studio.objects.all()
        serializer = StudioSerializer(studios, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
       serializer = StudioSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
    



# STAGES
@api_view(['GET', 'POST'])
def stages_list(request):
    if request.method == 'GET':
        stages = Stage.objects.all()
        serializer = StageSerializer(stages, many=True)
        return Response(serializer.data)
    

    if request.method == 'POST':
       serializer = StageSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
    



# STORES
@api_view(['GET', 'POST'])
def stores_list(request):

    if request.method == 'GET':
        stores = Store.objects.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)
    
    
    if request.method == 'POST':
        serializer = StoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response('ERROR for Views.py', status=status.HTTP_400_BAD_REQUEST)
 

