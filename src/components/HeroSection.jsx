import React from 'react';
import { Search } from 'lucide-react';

export default function HeroSection({ searchQuery, setSearchQuery, searchCategory, setSearchCategory, setCurrentPage }) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore opportunities. Expand your future.</h1>
        <p className="text-xl md:text-2xl mb-8 text-indigo-100">Your gateway to global jobs, scholarships, and professional courses</p>
        
      </div>
    </section>
  );
}