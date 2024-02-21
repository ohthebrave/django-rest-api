from django.http import HttpResponse
from online.models import User, Animal, Category
from online.serializers import UserSerializer, AnimalSerializer, CategorySerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, AuthenticationFailed
import jwt, datetime


# Create your views here.
def home(request):
    return HttpResponse("Hello World, Welcome to my application")

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

user_list_view = UserListAPIView.as_view()

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset= User.objects.all()
    serializer_class = UserSerializer
    # lookup_field = 'pk' ??

user_detail_view = UserDetailAPIView.as_view()


class PatientCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        email =serializer.validated_data.get('email')
        role = self.request.data.get('role')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        # Set the user role based on the data received
        if role == 'patient':
            serializer.save(is_patient=True)
        elif role == 'admin':
            serializer.save(is_admin=True)
        elif role == 'doctor':
            serializer.save(is_doctor=True)
        else:
            raise ValidationError("Invalid user role") 
         

farmer_list_view=PatientCreateAPIView.as_view()



class LoginView(generics.CreateAPIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Invalid user')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        # Determine the user's role (e.g., based on a field in the User model)
        role = 'patient' if user.is_patient else 'admin' if user.is_admin else 'doctor'
        
        payload = {
            'id': user.id,
            'name': user.username,
            'role': role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token,
            'role': role
        }


        return response
    
login_view= LoginView.as_view()


class LogoutView(generics.CreateAPIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
    

logout_view = LogoutView.as_view()

class AnimalListCreateAPIView(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user) 
         

animal_list_view=AnimalListCreateAPIView.as_view()


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

category_list = CategoryListCreateAPIView.as_view()