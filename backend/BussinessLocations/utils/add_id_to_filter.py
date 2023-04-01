from elasticsearch_dsl import Q


def add_id_to_filter(q, content_id):
    """
    adds the id to the filter
    :param q: query
    :param content_id: id
    :return: filter
    """
    return q & Q('term', **{"content.id": content_id})
