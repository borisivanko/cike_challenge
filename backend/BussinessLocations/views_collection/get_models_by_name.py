from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from BussinessLocations.documents import ModelDocument
from BussinessLocations.serializers import ModelSerializer
from BussinessLocations.utils.create_filter import create_filter


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_models_by_name(request, name):
    """
    List all models by <<Model Name>> with filter features
    """

    try:
        q = create_filter(name, request.query_params)
        qs = ModelDocument.search().query(q).to_queryset()
        serializer = ModelSerializer(qs, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})
