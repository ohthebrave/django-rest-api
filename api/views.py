from rest_framework import mixins, generics
from api.models import Farmer
from api.serializers import FarmerSerializer

# Create your views here.
class FarmerMixinView(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin,generics.GenericAPIView):

    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        print(args, kwargs)
        pk = kwargs.get("pk")


farmer_mixin_view = FarmerMixinView.as_view()