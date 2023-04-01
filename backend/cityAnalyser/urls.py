"""CityAnalyserL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from BussinessLocations.views import get_pois, get_homes, get_mhd, import_pois, import_homes, import_mhd, all_categories


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('import', import_endpoint),
    path('list-pois', get_pois),
    path('list-homes', get_homes),
    path('list-mhd', get_mhd),
    path('import-pois', import_pois),
    path('import-homes', import_homes),
    path('import-mhd', import_mhd),
    path('all-categories', all_categories),
    # path('detail/<str:name>/<int:content_id>', get_models_by_name_and_id),
    # path('detail/<str:name>', get_models_by_name),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]