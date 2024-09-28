// src/components/CategoryList.jsx

import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from '../api';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = useState([]);
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="list-container">
      <h2>Categories</h2>
      <button className="button-3d" onClick={() => navigate('/categories/new')}>
        Create New Category
      </button>
      {categories.map((category) => (
        <div key={category.id} className="list-item">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <div className="actions">
            <button onClick={() => navigate(`/categories/edit/${category.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
