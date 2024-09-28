// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import FoodItemList from './components/FoodItemsList';
import CategoryForm from './components/CategoryForm';
import FoodItemForm from './components/FoodItemForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hotel Menu</h1>
        <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/categories">Categories</Link> |{' '}
          <Link to="/food-items">Food Items</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />
          <Route path="/food-items" element={<FoodItemList />} />
          <Route path="/food-items/new" element={<FoodItemForm />} />
          <Route path="/food-items/edit/:id" element={<FoodItemForm />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>Welcome to the Hotel Menu Management System</h2>
  </div>
);

export default App;
