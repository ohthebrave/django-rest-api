from django.urls import path

from . import views

urlpatterns = [
    path("", views.farmer_mixin_view),
]