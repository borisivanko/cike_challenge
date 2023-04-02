# from .views_collection.import_endpoint import import_endpoint
# from .views_collection.get_models_by_name_and_id import get_models_by_name_and_id
# from .views_collection.get_models_by_name import get_models_by_name
import csv
import sys
import numpy as np
import scipy.spatial as spatial

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response


from BussinessLocations.models import POI, Home, MHD
from BussinessLocations.serializers import POISerializer, HomeSerializer, MHDSerializer, ReversedPOISerializer


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_pois(request):
    """
    List all models by <<Model Name>> with filter features
    """
    category = request.GET.get('category','all')

    try:
        if category == 'all':
            pois = POI.objects.all()
        else:
            pois = POI.objects.filter(typ_1=category)
        # q = create_filter(name, request.query_params)
        # qs = ModelDocument.search().query(q).to_queryset()
        serializer = POISerializer(pois, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_reversed_pois(request):
    """
    List all models by <<Model Name>> with filter features
    """
    category = request.GET.get('category','all')

    try:
        if category == 'all':
            pois = POI.objects.all()
        else:
            pois = POI.objects.filter(typ_0=category)

        point_tree = spatial.cKDTree(np.array([[p.x, p.y] for p in pois]))
        homes_without_pois = []
        for h in Home.objects.all():
            if len(point_tree.query_ball_point(np.array([h.x, h.y]), 0.007)) == 0:
                response_dict = dict()
                response_dict["type"] = "Feature"
                response_dict["geometry"] = {
                    "type": "Point",
                    "coordinates": [h.x, h.y]
                }

                response_dict["properties"] = {
                    "title": "",
                    "weight": 0.3
                }
                homes_without_pois.append(response_dict)

        serializer = ReversedPOISerializer(pois, many=True)
        d = serializer.data + homes_without_pois
        return Response(d)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def all_categories(request):
    values = POI.objects.values_list('typ_1', flat=True).distinct()
    return JsonResponse(list(values), safe=False)
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_homes(request):
    """
    List all models by <<Model Name>> with filter features
    """

    print("getting homes")
    try:
        homes = Home.objects.all()
        # q = create_filter(name, request.query_params)
        # qs = ModelDocument.search().query(q).to_queryset()
        serializer = HomeSerializer(homes, many=True)
        print("homes doney")
        return Response(serializer.data)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_mhd(request):
    """
    List all models by <<Model Name>> with filter features
    """

    try:
        mhd = MHD.objects.all()
        serializer = MHDSerializer(mhd, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})

csv.field_size_limit(262144)
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

csv.field_size_limit(262144)
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def import_homes(request):
    try:
        csv_file = request.FILES['csv_file']
        file = csv_file.read()
        decoded_file = file.decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)

        for row in reader:
            if row['Typ budovy'] in ['Bytovy dom', 'Rodinny dom', 'Iny budova', 'Budova ubytovacieho zariadenia']:
                new_home = Home(id=row['id'], x=row['x'], y=row['y'], type=row['Typ budovy'], count=row['Pocet-bytov'])
                new_home.save()
        # Process each row and save to the database

        return Response(status=status.HTTP_201_CREATED, data={'message': 'CSV file imported successfully.'})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})
    
csv.field_size_limit(262144)
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def import_mhd(request):
    try:
        csv_file = request.FILES['csv_file']
        file = csv_file.read()
        decoded_file = file.decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)

        for row in reader:
            new_mhd = MHD(id=row['ObjectId'], tram=row['elektricka'], tbus=row['trolejbus'], bus=row['autobus'], x=row['x'], y=row['y'])
            new_mhd.save()
        # Process each row and save to the database

        return Response(status=status.HTTP_201_CREATED, data={'message': 'CSV file imported successfully.'})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def normalize_by_homes(request):
    try:
        homes = Home.objects.all()
        counts = np.array([h.count for h in homes])
        point_tree = spatial.cKDTree(np.array([[h.x, h.y] for h in homes]))

        for p in POI.objects.all():
            sum_counts = np.sum(counts[point_tree.query_ball_point(np.array([p.x, p.y]), 0.001)])
            p.homes_in_proximity = sum_counts
            p.save()
        
        
        for p in MHD.objects.all():
            sum_counts = np.sum(counts[point_tree.query_ball_point(np.array([p.x, p.y]), 0.001)])
            p.homes_in_proximity = sum_counts
            p.save()
        
        # Process each row and save to the database

        return Response(status=status.HTTP_201_CREATED, data={'message': 'Data normalized by population successfully.'})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_number_of_people_in_proximity(request):
    try:
        x = float(request.GET['x'])
        y = float(request.GET['y'])
        radius = float(request.GET['radius'])
        homes = Home.objects.all()
        counts = np.array([h.count for h in homes])
        point_tree = spatial.cKDTree(np.array([[h.x, h.y] for h in homes]))
        sum_counts = np.sum(counts[point_tree.query_ball_point(np.array([x, y]), radius)])
        return Response(status=status.HTTP_200_OK, data={'number_of_people': sum_counts})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_number_of_pois_in_proximity_by_category(request):
    try:
        x = float(request.GET['x'])
        y = float(request.GET['y'])
        radius = float(request.GET['radius'])
        category = request.GET['category']
        pois = POI.objects.filter(typ_1=category)
        point_tree = spatial.cKDTree(np.array([[p.x, p.y] for p in pois]))
        sum_counts = len(point_tree.query_ball_point(np.array([x, y]), radius))
        return Response(status=status.HTTP_200_OK, data={'number_of_pois': sum_counts})
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})

