import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import CoursesPage from './pages/CoursesPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('jobs');
  const [jobFilters, setJobFilters] = useState({ field: '', country: '', experience: '' });
  const [scholarshipFilters, setScholarshipFilters] = useState({ country: '', degreeLevel: '', field: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {currentPage === 'home' && (
        <HomePage 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          searchCategory={searchCategory} 
          setSearchCategory={setSearchCategory} 
          setCurrentPage={setCurrentPage} 
        />
      )}
      
      {currentPage === 'jobs' && (
        <JobsPage 
          searchQuery={searchQuery} 
          jobFilters={jobFilters} 
          setJobFilters={setJobFilters} 
        />
      )}
      
      {currentPage === 'scholarships' && (
        <ScholarshipsPage 
          searchQuery={searchQuery} 
          scholarshipFilters={scholarshipFilters} 
          setScholarshipFilters={setScholarshipFilters} 
        />
      )}
      
      {currentPage === 'courses' && <CoursesPage />}
      
      {currentPage === 'blog' && <BlogPage />}
      
      {currentPage === 'about' && <AboutPage />}
      
      {currentPage === 'admin' && (
        <AdminPanel 
          isAdminLoggedIn={isAdminLoggedIn} 
          setIsAdminLoggedIn={setIsAdminLoggedIn} 
        />
      )}
    </div>
  );
}

export default App;