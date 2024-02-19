from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="about"),
    path("docs/", views.user_list_view),
    path("docs/<int:pk>/", views.user_detail_view),
    path("farmers/", views.patient_list_view),
    path("customers/", views.doctor_list_view),
    path("login/", views.login_view),
    path("logout/", views.logout_view),
    path("animals/", views.animal_list_view),
]
