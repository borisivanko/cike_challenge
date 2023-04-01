from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from BussinessLocations.documents import ModelDocument
from BussinessLocations.serializers import ModelSerializer
from BussinessLocations.utils.add_id_to_filter import add_id_to_filter
from BussinessLocations.utils.create_filter import create_filter


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_models_by_name_and_id(request, name, content_id):
    """
    List all models by <<Model Name>> and <<id>> with filter features
    """

    try:
        q = create_filter(name, request.query_params)
        q = add_id_to_filter(q, content_id)
        qs = ModelDocument.search().query(q).to_queryset()
        serializer = ModelSerializer(qs, many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND, data={'error': str(e)})
