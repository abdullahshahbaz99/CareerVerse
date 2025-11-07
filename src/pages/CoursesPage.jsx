import React from 'react';
import { mockCourses } from '../data/mockData';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional Courses</h1>
        <p className="text-gray-600 mb-8">Expert-led courses to accelerate your career</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 h-32"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium text-green-600">{course.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium text-gray-900">{course.instructor}</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}