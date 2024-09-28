// src/components/FoodItemList.jsx

import React, { useState, useEffect } from 'react';
import { fetchFoodItems, deleteFoodItem, fetchCategories } from '../api';
import { useNavigate } from 'react-router-dom';

function FoodItemList() {
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVegFilter, setIsVegFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadFoodItems = async () => {
      try {
        const data = await fetchFoodItems(selectedCategory || null, isVegFilter);
        setFoodItems(data);
      } catch (error) {
        console.error('Error loading food items:', error);
      }
    };
    loadFoodItems();
  }, [selectedCategory, isVegFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        await deleteFoodItem(id);
        setFoodItems(foodItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting food item:', error);
      }
    }
  };

  return (
    <div className="list-container">
      <h2>Food Items</h2>
      <button className="button-3d" onClick={() => navigate('/food-items/new')}>
        Add New Food Item
      </button>
      {/* Filters */}
      <div className="filters">
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Veg Status:
          <select
            value={isVegFilter === null ? '' : isVegFilter}
            onChange={(e) =>
              setIsVegFilter(
                e.target.value === '' ? null : e.target.value === 'true'
              )
            }
          >
            <option value="">All</option>
            <option value="true">Veg Only</option>
            <option value="false">Non-Veg Only</option>
          </select>
        </label>
      </div>
      {foodItems.map((item) => (
        <div key={item.id} className="list-item">
          <h3>{item.name}</h3>
          <p>
            Category: {item.category_name} | Price: ${item.price.toFixed(2)} |{' '}
            {item.is_veg ? 'Veg' : 'Non-Veg'}
          </p>
          <div className="actions">
            <button onClick={() => navigate(`/food-items/edit/${item.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodItemList;
