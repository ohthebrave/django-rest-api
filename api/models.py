from django.db import models

# Create your models here.
class Farmer(models.Model):
    full_names =models.CharField(max_length=100)
    email =models.EmailField(max_length=100)
    password =models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)  