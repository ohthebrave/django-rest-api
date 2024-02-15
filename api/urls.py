from django.urls import path

from . import views

urlpatterns = [
    path("", views.farmer_create_view),
    path("<int:pk>/", views.farmer_mixin_view),
]