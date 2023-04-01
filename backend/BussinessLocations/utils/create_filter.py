from elasticsearch_dsl import Q


def create_filter(name: str, query_params: dict):
    """
    creates a filter for the elastic search
    :param name: name of the model
    :param query_params: dict of query params
    :return: filter
    """
    q = Q('bool', must=[Q('match', name=name)])
    for key in query_params:
        q = q & Q('match', **{f'content.{key}': query_params[key]})
    return q
