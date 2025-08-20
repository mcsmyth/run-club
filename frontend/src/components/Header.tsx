import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ShoppingBag, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/run-club-logo.png" 
              alt="Run Club Logo" 
              className="h-20 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">Run Club</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/events" 
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span>Events</span>
            </Link>
            <Link 
              to="/workouts" 
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Workouts</span>
            </Link>
            <Link 
              to="/store" 
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Store</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
