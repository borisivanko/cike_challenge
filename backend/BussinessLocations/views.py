# from .views_collection.import_endpoint import import_endpoint
# from .views_collection.get_models_by_name_and_id import get_models_by_name_and_id
# from .views_collection.get_models_by_name import get_models_by_name
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
