import React, { useState, useEffect } from 'react';
import {
  createFoodItem,
  fetchFoodItemById,
  updateFoodItem,
  fetchCategories,
} from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './FoodItemForm.css';

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

  const selectedCategory = categories.find(cat => cat.id === categoryId);

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-section">
          <div className="form-card">
            <h2>{isEditMode ? 'Edit Food Item' : 'Add New Food Item'}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
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
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  step="0.01"
                />
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isVeg}
                    onChange={(e) => setIsVeg(e.target.checked)}
                  />
                  <span>Vegetarian</span>
                </label>
              </div>
              <button type="submit" className="submit-button">
                {isEditMode ? 'Update Food Item' : 'Add Food Item'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="preview-section">
          <div className="preview-card">
            <h2>Preview</h2>
            <div className="preview-content">
              {name ? (
                <div className="food-item-preview">
                  <div className="preview-header">
                    <h3>{name}</h3>
                    {isVeg && (
                      <span className="veg-indicator">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  {selectedCategory && (
                    <p className="category-tag">{selectedCategory.name}</p>
                  )}
                  {price && (
                    <p className="price-tag">${parseFloat(price).toFixed(2)}</p>
                  )}
                </div>
              ) : (
                <p className="preview-placeholder">Fill out the form to see a preview</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemForm;