from rest_framework import mixins, generics
from api.models import Farmer
from api.serializers import FarmerSerializer

# Create your views here.
class FarmerCreateAPIView(generics.CreateAPIView):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer

farmer_create_view = FarmerCreateAPIView.as_view()

class FarmerDetailApiView(generics.RetrieveAPIView):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    # lookup_field= 'pk'

farmer_mixin_view = FarmerDetailApiView.as_view()