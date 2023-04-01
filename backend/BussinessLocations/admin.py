from django.contrib import admin

# Register your models here.
#
from .models import POI, Home, MHD

admin.site.register(POI)
admin.site.register(Home)
admin.site.register(MHD)


