from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
#
#
# from .models import Model
#
#
# @registry.register_document
# class ModelDocument(Document):
#     content = fields.ObjectField()
#
#     class Index:
#         # Name of the Elasticsearch index
#         name = 'models'
#         # See Elasticsearch Indices API reference for available settings
#         settings = {'number_of_shards': 1,
#                     'number_of_replicas': 0}
#
#     class Django:
#         model = Model
#
#         # The fields of the model you want to be indexed in Elasticsearch
#         fields = [
#             'name',
#             'created',
#             'last_updated',
#         ]
#
#

