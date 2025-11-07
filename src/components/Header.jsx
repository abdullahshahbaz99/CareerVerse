import React from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) {
  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'Jobs', page: 'jobs' },
    { name: 'Scholarships', page: 'scholarships' },
    { name: 'Courses', page: 'courses' },
    { name: 'Blog', page: 'blog' },
    { name: 'About', page: 'about' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CareerVerse</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`${currentPage === item.page ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'} px-3 py-2 text-sm font-medium transition-colors`}
              >
                {item.name}
              </button>
            ))}
            <button onClick={() => setCurrentPage('admin')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Admin
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navigation.map(item => (
              <button
                key={item.page}
                onClick={() => { setCurrentPage(item.page); setMobileMenuOpen(false); }}
                className={`${currentPage === item.page ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'} block w-full text-left px-3 py-2 text-base font-medium hover:bg-gray-50`}
              >
                {item.name}
              </button>
            ))}
            <button onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
              Admin
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}