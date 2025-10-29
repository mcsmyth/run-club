import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ShoppingBag, Info, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <img 
              src={`${process.env.PUBLIC_URL}/run-club-logo.png`}
              alt="Run Club Logo" 
              className="h-20 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">Run Club</span>
          </Link>

          {/* Desktop Navigation */}
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
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link 
                to="/events" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </Link>
              <Link 
                to="/workouts" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <Users className="h-5 w-5" />
                <span>Workouts</span>
              </Link>
              <Link 
                to="/store" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Store</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
