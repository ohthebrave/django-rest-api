from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    is_seller = models.BooleanField(default=False)
    is_buyer = models.BooleanField(default=False)


class Customer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, null=True
    )
    location = models.CharField(max_length=30, blank=True)
    avatar = models.ImageField(upload_to="images", null=True)
    phone_number = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.user.username


class Farmer(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, null=True
    )
    area = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
