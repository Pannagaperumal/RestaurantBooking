from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Category, FoodItem, CartItem
from .serializers import CategorySerializer, FoodItemSerializer, CartItemSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.shortcuts import get_object_or_404

class BaseAPIView(APIView):
    def get_object(self, model_class, pk):
        return get_object_or_404(model_class, pk=pk)

    def handle_serializer(self, serializer, instance=None):
        if instance:
            serializer = serializer(instance, data=self.request.data, partial=True)
        else:
            serializer = serializer(data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK if instance else status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryList(BaseAPIView):
    @swagger_auto_schema(
        operation_description="Retrieve list of all categories",
        tags=['Categories']
    )
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create a new category",
        request_body=CategorySerializer,
        tags=['Categories']
    )
    def post(self, request, *args, **kwargs):
        return self.handle_serializer(CategorySerializer)

class CategoryDetail(BaseAPIView):
    @swagger_auto_schema(
        operation_description="Retrieve a specific category",
        tags=['Categories']
    )
    def get(self, request, pk, *args, **kwargs):
        category = self.get_object(Category, pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a specific category",
        request_body=CategorySerializer,
        tags=['Categories']
    )
    def put(self, request, pk, *args, **kwargs):
        category = self.get_object(Category, pk)
        return self.handle_serializer(CategorySerializer, category)

    @swagger_auto_schema(
        operation_description="Delete a specific category",
        tags=['Categories']
    )
    def delete(self, request, pk, *args, **kwargs):
        category = self.get_object(Category, pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FoodItemList(BaseAPIView):
    @swagger_auto_schema(
        operation_description="Retrieve list of all food items",
        manual_parameters=[
            openapi.Parameter('category', openapi.IN_QUERY, description="Filter by category ID", type=openapi.TYPE_INTEGER),
            openapi.Parameter('is_veg', openapi.IN_QUERY, description="Filter by veg/non-veg", type=openapi.TYPE_BOOLEAN),
        ],
        tags=['Food Items']
    )
    def get(self, request, *args, **kwargs):
        category = request.query_params.get('category')
        is_veg = request.query_params.get('is_veg')
        queryset = FoodItem.objects.all()
        if category:
            queryset = queryset.filter(category_id=category)
        if is_veg is not None:
            queryset = queryset.filter(is_veg=is_veg)
        serializer = FoodItemSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create a new food item",
        request_body=FoodItemSerializer,
        tags=['Food Items']
    )
    def post(self, request, *args, **kwargs):
        return self.handle_serializer(FoodItemSerializer)

class FoodItemDetail(BaseAPIView):
    
    @swagger_auto_schema(
        operation_description="Retrieve a specific food item",
        tags=['Food Items']
    )
    def get(self, request, pk, *args, **kwargs):
        food_item = self.get_object(FoodItem, pk)
        serializer = FoodItemSerializer(food_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a specific food item",
        request_body=FoodItemSerializer,
        tags=['Food Items']
    )
    def put(self, request, pk, *args, **kwargs):
        food_item = self.get_object(FoodItem, pk)
        return self.handle_serializer(FoodItemSerializer, food_item)

    @swagger_auto_schema(
        operation_description="Delete a specific food item",
        tags=['Food Items']
    )
    def delete(self, request, pk, *args, **kwargs):
        food_item = self.get_object(FoodItem, pk)
        food_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
