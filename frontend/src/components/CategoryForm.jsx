// src/components/CategoryForm.jsx

import React, { useState, useEffect } from 'react';
import { createCategory, fetchCategoryById, updateCategory } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const loadCategory = async () => {
        try {
          const data = await fetchCategoryById(id);
          setName(data.name);
          setDescription(data.description || '');
        } catch (error) {
          console.error('Error loading category:', error);
          setError('Failed to load category');
        }
      };
      loadCategory();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name, description };
    try {
      if (isEditMode) {
        await updateCategory(id, categoryData);
      } else {
        await createCategory(categoryData);
      }
      navigate('/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Failed to save category');
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Edit Category' : 'Create New Category'}</h2>
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
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default CategoryForm;
