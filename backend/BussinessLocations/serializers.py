from rest_framework import serializers
from BussinessLocations.models import POI, Home, MHD
import numpy as np


class POISerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = POI
        fields = ['name', 'x', 'y', 'typ_0', 'typ_1', 'poly_15']


    def to_representation(self, instance):
        response_dict = dict()
        response_dict["type"] = "Feature"
        response_dict["geometry"] = {
            "type": "Point",
            "coordinates": [instance.x, instance.y]
        }

        rel = max(min(instance.homes_in_proximity, 500)/500, 0.02)
        w = (np.log10(rel) + 1.8) / 1.8

        response_dict["properties"] = {
            "title": instance.name,
            "type": instance.typ_0,
            "type2": instance.typ_1,
            "weight": w
        }
        return response_dict
#
# LEFT-TOP 21.171520, 48.766840
# BOTTOM_RIGHT 21.2987386, 48.689769

class HomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'x', 'y', 'type', 'count']

    def to_representation(self, instance):
        response_dict = dict()
        response_dict["type"] = "Feature"
        response_dict["geometry"] = {
            "type": "Point",
            "coordinates": [instance.x, instance.y]
        }
        response_dict["properties"] ={"weight": instance.count}
        return response_dict


class MHDSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MHD
        fields = ['id', 'tram', 'tbus', 'bus', 'x', 'y']

    def to_representation(self, instance):
        response_dict = dict()
        response_dict["type"] = "Feature"
        response_dict["geometry"] = {
            "type": "Point",
            "coordinates": [instance.x, instance.y]
        }

        rel = max(min(instance.homes_in_proximity, 500)/500, 0.02)
        w = (np.log10(rel) + 1.8) / 1.8

        response_dict["properties"] = {
            "title": "trolejbus/elektricka",
            "weight": w
        }
        return response_dict
