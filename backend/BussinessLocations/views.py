# from .views_collection.import_endpoint import import_endpoint
# from .views_collection.get_models_by_name_and_id import get_models_by_name_and_id
# from .views_collection.get_models_by_name import get_models_by_name
import csv
import sys

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response


from BussinessLocations.models import POI
from BussinessLocations.serializers import POISerializer


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_pois(request):
    """
    List all models by <<Model Name>> with filter features
    """

    try:
        pois = POI.objects.all()
        # q = create_filter(name, request.query_params)
        # qs = ModelDocument.search().query(q).to_queryset()
        serializer = POISerializer(pois, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})


csv.field_size_limit(sys.maxsize)
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def import_pois(request):
    try:
        csv_file = request.FILES['csv_file']
        file = csv_file.read()
        decoded_file = file.decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)

        for row in reader:
            new_poi = POI(name=row['name'], typ_0=row['typ_0'], typ_1=row['typ_1'], x=row['x'], y=row['y'])
            new_poi.save()
        # Process each row and save to the database

        return Response(status=status.HTTP_201_CREATED, data={'message': 'CSV file imported successfully.'})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})