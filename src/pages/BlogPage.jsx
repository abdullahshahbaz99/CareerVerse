import React from 'react';
import { mockBlogs } from '../data/mockData';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Guides & Resources</h1>
        <p className="text-gray-600 mb-8">Expert tips and advice to help you succeed</p>
        
        <div className="space-y-6">
          {mockBlogs.map(blog => (
            <article key={blog.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer">{blog.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>{blog.author}</span>
                <span className="mx-2">•</span>
                <span>{blog.date}</span>
              </div>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <button className="text-indigo-600 font-medium hover:text-indigo-700">Read more →</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}