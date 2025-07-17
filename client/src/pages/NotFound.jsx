import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          <Home size={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
