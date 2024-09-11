from django.contrib import admin
from .models import Category, FoodItem, CartItem

admin.site.register(Category)
admin.site.register(FoodItem)
admin.site.register(CartItem)
