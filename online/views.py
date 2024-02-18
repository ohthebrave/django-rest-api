from django.http import HttpResponse
from online.models import User
from online.serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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


class PatientListAPIView(generics.ListAPIView):
    queryset = User.objects.filter(is_patient=True)
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

patient_list_view=PatientListAPIView.as_view()

class DoctorListView(generics.ListAPIView):
    queryset = User.objects.filter(is_doctor=True)
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

doctor_list_view= DoctorListView.as_view()

