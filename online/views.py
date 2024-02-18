from django.http import HttpResponse
from online.models import User
from online.serializers import UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, AuthenticationFailed


# Create your views here.
def home(request):
    return HttpResponse("Hello World")

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

user_list_view = UserListAPIView.as_view()

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset= User.objects.all()
    serializer_class = UserSerializer
    # lookup_field = 'pk' ??

user_detail_view = UserDetailAPIView.as_view()


class PatientListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.filter(is_patient=True)
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        email =serializer.validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        serializer.save(is_patient=True) 
         

patient_list_view=PatientListCreateAPIView.as_view()

class DoctorListView(generics.ListAPIView):
    queryset = User.objects.filter(is_doctor=True)
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        email =serializer.validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        serializer.save(is_doctor=True)

doctor_list_view= DoctorListView.as_view()


class LoginView(generics.CreateAPIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Invalid user')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        return Response({
            'message': 'Success'
        })
    
login_view= LoginView.as_view()