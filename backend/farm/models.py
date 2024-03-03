from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.utils.text import slugify

# Create your models here.
class User(AbstractUser):
	is_admin = models.BooleanField(default=False)
	is_farmer = models.BooleanField(default=False)
	is_customer = models.BooleanField(default=False)
	email = models.CharField(max_length=200, unique=True)


	USERNAME_FIELD= 'email'
	REQUIRED_FIELDS= []

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category,self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name

class Animal(models.Model):
    breed = models.CharField(max_length=50)
    image_url = models.URLField(max_length=350)
    age = models.PositiveIntegerField()
    weight = models.DecimalField(max_digits=10, decimal_places=1, default=99.9)
    description = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=200, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=99.99)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.breed

class Cart(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.user.username)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    paid_amount = models.FloatField(default=0)
    date_order = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
    contact_number= models.CharField(max_length=20)
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    address= models.CharField(max_length=100)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"