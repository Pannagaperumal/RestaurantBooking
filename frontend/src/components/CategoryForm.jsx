import React, { useState, useEffect } from 'react';
import { createCategory, fetchCategoryById, updateCategory } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryForm.css'; // We'll define styles after the component

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
      <div className="form-wrapper">
        <div className="form-section">
          <div className="form-card">
            <h2>{isEditMode ? 'Edit Category' : 'Create New Category'}</h2>
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
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <button type="submit" className="submit-button">
                {isEditMode ? 'Update Category' : 'Create Category'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="preview-section">
          <div className="preview-card">
            <h2>Preview</h2>
            <div className="preview-content">
              {name ? (
                <>
                  <div className="preview-header">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 12H4M4 12L10 6M4 12L10 18" />
                    </svg>
                    <h3>{name}</h3>
                  </div>
                  {description && <p>{description}</p>}
                </>
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

export default CategoryForm;