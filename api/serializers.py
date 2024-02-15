from rest_framework import serializers
from api.models import Farmer


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = [
            'full_names',
            'email',
            'password',
            'phone_number',
        ]