from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="about"),
    path("docs/", views.user_list_view),
    path("docs/<int:pk>/", views.user_detail_view),
    path("patients/", views.patient_list_view),
    path("doctors/", views.doctor_list_view),
    path("login/", views.login_view),
    path("logout/", views.logout_view),
]
