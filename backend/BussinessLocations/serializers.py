from rest_framework import serializers
from BussinessLocations.models import POI, Home


class POISerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = POI
        fields = ['name', 'x', 'y', 'typ_1', 'poly_15' ]


class HomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'x', 'y', 'type', 'count']
