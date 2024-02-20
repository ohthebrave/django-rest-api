from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
	is_admin = models.BooleanField(default=False)
	is_patient = models.BooleanField(default=False)
	is_doctor = models.BooleanField(default=False)
	email = models.CharField(max_length=200, unique=True)

	USERNAME_FIELD= 'email'
	REQUIRED_FIELDS= []


class Category(models.Model):
    name = models.CharField(max_length=100)
    

class Animal(models.Model):
    breed = models.CharField(max_length=50)
    image_url = models.URLField(max_length=350)
    age = models.PositiveIntegerField()
    weight = models.DecimalField(max_digits=10, decimal_places=1, default=99.9)
    description = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=99.99)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

