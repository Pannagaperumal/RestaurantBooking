import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import FoodItemList from './components/FoodItemsList';
import CategoryForm from './components/CategoryForm';
import FoodItemForm from './components/FoodItemForm';
import Home from './components/Home'; // Assuming you've moved the Home component to a separate file
import './App.css';

function App() {
  // Add custom CSS styles
  const style = `
    /* Glassmorphism effect for the navbar */
    .glass-navbar {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px); /* for Safari support */
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }

    /* Navbar container with perspective for 3D effect */
    .navbar {
      perspective: 1000px;
    }

    /* Logo with 3D effect */
    .nav-logo {
      transform-style: preserve-3d;
      transition: transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
    }

    .nav-logo:hover {
      transform: translateZ(30px);
      text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
    }

    /* NavLink styling */
    .nav-link {
      position: relative;
      display: inline-block;
      padding: 0.5rem 1rem;
      color: #174d9d;
 /* text-gray-300 */
      transition: color 0.3s, text-shadow 0.3s;
    }

    .nav-link:hover {
      color: #ffffff; /* text-white */
      text-shadow: 0 0 5px rgba(59, 130, 246, 0.8);
    }

    /* Underline effect */
    .nav-link::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 0%;
      height: 2px;
      background: linear-gradient(90deg, rgba(59, 130, 246, 1) 0%, rgba(147, 197, 253, 1) 100%);
      transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
    }

    .nav-link:hover::after {
      width: 100%;
      left: 0;
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
          <header className="glass-navbar">
            <div className="max-w-6xl mx-auto px-4">
              <nav className="flex items-center justify-between h-16 navbar">

                {/* Navigation links on the right */}
                <div className="flex gap-6">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/categories">Categories</NavLink>
                  <NavLink to="/food-items">Food Items</NavLink>
                </div>
              </nav>
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/new" element={<CategoryForm />} />
              <Route path="/categories/edit/:id" element={<CategoryForm />} />
              <Route path="/food-items" element={<FoodItemList />} />
              <Route path="/food-items/new" element={<FoodItemForm />} />
              <Route path="/food-items/edit/:id" element={<FoodItemForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

// Custom NavLink component for consistent styling
const NavLink = ({ to, children }) => (
  <Link to={to} className="nav-link">
    {children}
  </Link>
);

export default App;
