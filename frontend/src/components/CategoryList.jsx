import React, { useState } from 'react';
import './CategoryList.css'; // Make sure to import the CSS file

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, ...newCategory } : cat
      ));
      setEditingId(null);
    } else {
      setCategories([...categories, { ...newCategory, id: Date.now() }]);
    }
    setNewCategory({ name: '', description: '' });
  };

  const handleEdit = (category) => {
    setNewCategory({ name: category.name, description: category.description });
    setEditingId(category.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className="category-list-container">
      <h2 className="category-list-title">Categories</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleInputChange}
          placeholder="Category Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newCategory.description}
          onChange={handleInputChange}
          placeholder="Category Description"
        />
        <button type="submit" className="button-3d">
          {editingId !== null ? 'Update Category' : 'Create New Category'}
        </button>
      </form>
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <div className="category-actions">
            <button className="edit-button" onClick={() => handleEdit(category)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(category.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;