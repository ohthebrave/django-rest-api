from online.models import User, Animal, Category
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id', 'username', 'email', 'password', ]
        extra_kwargs= {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ['id', 'name']


class AnimalSerializer(serializers.ModelSerializer):
    farmer_username = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Animal
        fields = ['id', 'breed', 'age', 'image_url','description', "date_posted",'weight', 'price', 'farmer_id', 'farmer_username', 'category_id', 'category_name']

    def get_farmer_username(self, obj):
        return obj.farmer.username
    
    def get_category_name(self, obj):
        return obj.category.name



