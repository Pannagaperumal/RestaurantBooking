// src/components/FoodItemForm.jsx

import React, { useState, useEffect } from 'react';
import {
  createFoodItem,
  fetchFoodItemById,
  updateFoodItem,
  fetchCategories,
} from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function FoodItemForm() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError('Failed to load categories');
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const loadFoodItem = async () => {
        try {
          const data = await fetchFoodItemById(id);
          setName(data.name);
          setCategoryId(data.category);
          setPrice(data.price);
          setIsVeg(data.is_veg);
        } catch (error) {
          console.error('Error loading food item:', error);
          setError('Failed to load food item');
        }
      };
      loadFoodItem();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foodItemData = {
      name,
      category: categoryId,
      price: parseFloat(price),
      is_veg: isVeg,
    };
    try {
      if (isEditMode) {
        await updateFoodItem(id, foodItemData);
      } else {
        await createFoodItem(foodItemData);
      }
      navigate('/food-items');
    } catch (error) {
      console.error('Error saving food item:', error);
      setError('Failed to save food item');
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Edit Food Item' : 'Add New Food Item'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={isVeg}
            onChange={(e) => setIsVeg(e.target.checked)}
          />
          Is Veg
        </label>
        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default FoodItemForm;
