# urls.py

"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import (
    CategoryList, CategoryDetail,
    FoodItemList, FoodItemDetail,
)

urlpatterns = [
    # Category URLs
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    
    # FoodItem URLs
    path('food-items/', FoodItemList.as_view(), name='fooditem-list'),
    path('food-items/<int:pk>/', FoodItemDetail.as_view(), name='fooditem-detail'),


    # CartItem URLs
    # path('cart-items/', CartItemList.as_view(), name='cartitem-list'),
    # path('cart-items/<int:pk>/', CartItemDetail.as_view(), name='cartitem-detail'),
]