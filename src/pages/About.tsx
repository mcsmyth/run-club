import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Run Club
          </h1>
          <p className="text-lg text-gray-600">
            Learn more about our community and mission
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About Page Coming Soon
          </h2>
          <p className="text-gray-600">
          Stride, stroll, or sprint
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
