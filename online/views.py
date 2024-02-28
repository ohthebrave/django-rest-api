from django.http import HttpResponse
from online.models import User, Animal, Category
from online.serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, AuthenticationFailed
import jwt, datetime
from rest_framework import permissions
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


# Decorator to exempt CSRF protection for this view
@csrf_exempt  
def stk_push(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YIGEBnWHASpA34eMkSPOJVcX4OAI',
        }

        payload = {
            "BusinessShortCode": 174379,
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjI1MTUzNjU4",
            "Timestamp": "20240225153658",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": data['amount'],
            "PartyA": data['phoneNumber'],
            "PartyB": 174379,
            "PhoneNumber": data['phoneNumber'],
            "CallBackURL": "https://mydomain.com/path",
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X" 
        }

        response = requests.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', headers=headers, json=payload)
        print(response.text.encode('utf8'))

        return JsonResponse({'message': 'Request processed successfully'})  


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
        print(self.request.data)
        user_id = self.request.data.get('farmer')
        user = User.objects.filter(id=user_id).first()
        serializer.save(farmer=user) 
         

animal_list_view=AnimalListCreateAPIView.as_view()


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

category_list = CategoryListCreateAPIView.as_view()


class CartCreateAPIView(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def perform_create(self, serializer):
        print(self.request.data)
        user_id = self.request.data.get('user')
        customer = User.objects.filter(id=user_id).first()
        serializer.save(user=customer)

cart_list = CartCreateAPIView.as_view()

class FarmerAnimalListView(generics.ListAPIView):
    serializer_class = AnimalSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request.user)
        # Retrieve animals posted by the currently logged-in farmer
        return Animal.objects.filter(farmer=self.request.user)

filtered_animal = FarmerAnimalListView.as_view()

class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

order_create = OrderCreateAPIView.as_view()


class OrderItemCreateAPIView(generics.CreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer