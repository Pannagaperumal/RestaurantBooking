import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, QrCode, Clock, ClipboardList } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white p-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-blue-900 opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-600 to-transparent blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-radial from-blue-500 to-transparent blur-2xl opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-extrabold mb-6 tracking-wide animate-fade-in">
            <span className="text-blue-500">Scan</span>
            <span className="text-white">Out</span>
          </h1>
          <p className="text-xl text-blue-200 mb-8">
          </p>

          <div className="flex justify-center gap-4 mb-12">
          </div>
        </div>

        {/* Mockup Phone Enhanced */}
        <div className="perspective-container">
          <div className="mockup-phone shadow-lg shadow-blue-700/50">
            <div className="mockup-screen">
              <div className="mockup-content">
                <div className="mockup-header"></div>
                <div className="mockup-item"></div>
                <div className="mockup-item"></div>
                <div className="mockup-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-blue-900/40 p-8 rounded-xl transform transition-all hover:scale-105 hover:bg-blue-800/40 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/50 hover:-rotate-1">
    <div className="mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-blue-200">{description}</p>
  </div>
);

// Add required CSS
const style = document.createElement('style');
style.textContent = `
  .animate-fade-in {
    animation: fadeIn 1.2s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .perspective-container {
    perspective: 1500px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mockup-phone {
    width: 280px;
    height: 350px;
    background: #2c5282;
    border-radius: 40px;
    padding: 12px;
    transform: rotateY(-25deg) rotateX(15deg);
    animation: float 8s ease-in-out infinite;
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.5);
  }

  .mockup-screen {
    background: #1a365d;
    height: 100%;
    border-radius: 30px;
    overflow: hidden;
  }

  .mockup-content {
    padding: 25px;
  }

  .mockup-header {
    height: 24px;
    background: #4299e1;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .mockup-item {
    height: 50px;
    background: #2b6cb0;
    margin-bottom: 15px;
    border-radius: 8px;
  }

  @keyframes float {
    0% { transform: rotateY(-25deg) rotateX(15deg) translateY(0px); }
    50% { transform: rotateY(-25deg) rotateX(15deg) translateY(-25px); }
    100% { transform: rotateY(-25deg) rotateX(15deg) translateY(0px); }
  }

  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`;
document.head.appendChild(style);

export default Home;
