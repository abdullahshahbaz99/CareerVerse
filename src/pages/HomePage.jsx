import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import Newsletter from '../components/Newsletter';

export default function HomePage({ searchQuery, setSearchQuery, searchCategory, setSearchCategory, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchCategory={searchCategory} setSearchCategory={setSearchCategory} setCurrentPage={setCurrentPage} />
      <FeatureCards setCurrentPage={setCurrentPage} />
      <Newsletter />
    </div>
  );
}