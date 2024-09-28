// src/api.js

const API_URL = 'http://localhost:8000/api';  // Adjust this to your Django server URL

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories/`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const fetchCategoryById = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }
  return response.json();
};

export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_URL}/categories/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) {
    throw new Error('Failed to create category');
  }
  return response.json();
};

export const updateCategory = async (id, categoryData) => {
  const response = await fetch(`${API_URL}/categories/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) {
    throw new Error('Failed to update category');
  }
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}/`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
};

export const fetchFoodItems = async (category = null, isVeg = null) => {
  let url = `${API_URL}/food-items/`;
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (isVeg !== null) params.append('is_veg', isVeg);
  if (params.toString()) url += `?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch food items');
  }
  return response.json();
};

export const fetchFoodItemById = async (id) => {
  const response = await fetch(`${API_URL}/food-items/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch food item');
  }
  return response.json();
};

export const createFoodItem = async (foodItemData) => {
  const response = await fetch(`${API_URL}/food-items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(foodItemData)
  });
  if (!response.ok) {
    throw new Error('Failed to create food item');
  }
  return response.json();
};

export const updateFoodItem = async (id, foodItemData) => {
  const response = await fetch(`${API_URL}/food-items/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(foodItemData)
  });
  if (!response.ok) {
    throw new Error('Failed to update food item');
  }
  return response.json();
};

export const deleteFoodItem = async (id) => {
  const response = await fetch(`${API_URL}/food-items/${id}/`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete food item');
  }
};
