from django.contrib import admin
from .models import User, Animal, Category
# Register your models here.

admin.site.register(User)
admin.site.register(Animal)
admin.site.register(Category)
