from rest_framework import serializers
from BussinessLocations.models import POI


class POISerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = POI
        fields = ['name', 'x', 'y', 'typ_1', 'poly_15' ]
