from rest_framework import permissions, status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from BussinessLocations.models import Model


@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes((permissions.AllowAny,))
def import_endpoint(request):
    """
    Imports a list of models from json format

    Most models have a id field, but it is not necessary
    """

    # for storing models, until all are checked as valid
    queue = []

    for item in request.data:
        # in reality there is always only one key
        for key in item:
            name = key
            content = item[key]
            queue.append(Model(name=name, content=content))

    # save all models in queue
    for model in queue:
        model.save()

    return Response(status=status.HTTP_200_OK, data={'success': f'import successful - imported {len(queue)} models'})
