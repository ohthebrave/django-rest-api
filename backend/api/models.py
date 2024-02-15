from django.db import models
from django.utils import timezone
from decimal import Decimal

# Create your models here.
class Farmer(models.Model):
    full_names =models.CharField(max_length=100)
    email =models.EmailField(max_length=100)
    password =models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)


class Category(models.Model):
    animal_type = models.CharField(max_length=100)


class Animal(models.Model):
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=50)
    age = models.IntegerField()
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL)
    location = models.CharField(max_length=50)


class Cart(models.Model):
    animal = models.ForeignKey(Animal)
    quantity = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=99.99)


class Customer(models.Model):
    full_names =models.CharField(max_length=100)
    email =models.EmailField(max_length=100)
    password =models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)


class Order(models.Model):
    customer = models.ForeignKey(Customer, null=True, blank=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=99.99)
    created_at = models.DateTimeField(default=timezone.now)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    amount_total = models.DecimalField(max_digits=10, decimal_places=2, default=99.99)
