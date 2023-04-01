from rest_framework import serializers
from BussinessLocations.models import POI, Home, MHD


class POISerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = POI
        fields = ['name', 'x', 'y', 'typ_0', 'typ_1', 'poly_15']

        # {
        #     type: "FeatureCollection",
        #     features: [
        #         {
        #             type: "Feature",
        #             geometry: {
        #                 type: "Point",
        #                 coordinates: [0, 0]
        #             },
        #             properties: {title: "HeatmapPts", id: 111, name: "sample 1"}
        #         },
        #     ]
        # }

    def to_representation(self, instance):
        response_dict = dict()
        response_dict["type"] = "Feature"
        response_dict["geometry"] = {
            "type": "Point",
            "coordinates": [instance.x, instance.y]
        }
        response_dict["properties"] = {"title": instance.name}
        return response_dict


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
        response_dict["properties"] = {"title": instance.type, "weight": instance.count}
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
        response_dict["properties"] = {"title": "trolejbus/elektricka"}
        return response_dict
