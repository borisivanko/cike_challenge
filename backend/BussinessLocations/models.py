from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.

class POI(models.Model):
    name = models.CharField(max_length=200)
    typ_0 = models.CharField(max_length=100)
    typ_1 = models.CharField(max_length=100)
    x = models.FloatField()
    y = models.FloatField()
    poly_5 = ArrayField(models.FloatField(null=True, blank=True), null=True, blank=True)
    poly_10 = ArrayField(models.FloatField(null=True, blank=True), null=True, blank=True)
    poly_15 = ArrayField(models.FloatField(null=True, blank=True), null=True, blank=True)
    poly_20 = ArrayField(models.FloatField(null=True, blank=True), null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
