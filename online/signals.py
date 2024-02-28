from django.db.models.signals import post_save
from .models import Cart, Order
from django.dispatch import receiver