from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from site_modules import serializers

from .serializers import SignatureColorsSerializer
from .models import SignatureColors


@api_view(['GET'])
def signature_colors(request):
    signature_colors = SignatureColors.objects.all()

    serializer = SignatureColorsSerializer(signature_colors, many=True)
    
    return Response(serializer.data)

