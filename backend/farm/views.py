from django.http import HttpResponse
from .models import User, Animal, Category
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, AuthenticationFailed
import jwt, datetime
from rest_framework_simplejwt.tokens import RefreshToken
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status


# Decorator to exempt CSRF protection for this view
@csrf_exempt  
def stk_push(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer IRqyOQsklCPk1He1GIgpeG3wyoi4',
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


class AnimalDetailAPIView(generics.RetrieveAPIView):
    queryset= Animal.objects.all()
    serializer_class = AnimalSerializer
    # lookup_field = 'pk' ??

animal_detail_view = AnimalDetailAPIView.as_view()


class PatientCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        email =serializer.validated_data.get('email')
        role = self.request.data.get('role')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        # Set the user role based on the data received
        if role == 'farmer':
            serializer.save(is_farmer=True)
        elif role == 'admin':
            serializer.save(is_admin=True)
        elif role == 'customer':
            serializer.save(is_customer=True)
        else:
            raise ValidationError("Invalid user role") 
         

farmer_list_view=PatientCreateAPIView.as_view()



class LoginView(generics.CreateAPIView):
    
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = authenticate(email=email, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid user')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        # Determine the user's role (e.g., based on a field in the User model)
        role = 'farmer' if user.is_farmer else 'admin' if user.is_admin else 'customer'
        

        refresh = RefreshToken.for_user(user)
        refresh["name"] = user.username

        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': role
        })
    
login_view= LoginView.as_view()


class LogoutView(generics.CreateAPIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access')
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

class AnimalUpdateAPIView(generics.UpdateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def perform_update(self, serializer):
        user_id = self.request.data.get('farmer')
        if user_id: 
            user = User.objects.filter(id=user_id).first()
            serializer.save(farmer=user)
        else:
            serializer.save()

animal_update_view = AnimalUpdateAPIView.as_view()

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

class FarmerListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AnimalSerializer

    def get_queryset(self):
        current_user = self.request.user
        user_list = Animal.objects.filter(farmer=current_user)
        return user_list

filtered_farmer = FarmerListView.as_view()

class OrdersListCreateAPIView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        # Get the user_id from the request
        user_id = self.request.data.get('user', None)
        if user_id is not None:
            # Fetch the user object corresponding to the provided user_id
            customer = User.objects.filter(id=user_id).first()
            if customer is not None:
                # Set the user field of the serializer data to the fetched user object
                serializer.save(user=customer)
            else:
                # Handle case where user_id doesn't correspond to any existing user
                # You may raise an exception or handle it according to your use case
                raise ValidationError("Invalid user_id provided.")
        else:
            # Handle case where user_id is not provided in the request data
            # You may raise an exception or handle it according to your use case
            raise ValidationError("user_id is required in the request data.")



order_list_create_view = OrdersListCreateAPIView.as_view()

class OrderDestroyView(generics.DestroyAPIView):
    queryset = Order.objects.all()  
    serializer_class = OrderSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)
        

destroy_orders_list = OrderDestroyView.as_view()