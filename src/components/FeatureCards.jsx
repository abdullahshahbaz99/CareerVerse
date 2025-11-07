import React from 'react';
import { Briefcase, GraduationCap, BookOpen } from 'lucide-react';
import { mockJobs, mockScholarships, mockCourses } from '../data/mockData';

export default function FeatureCards({ setCurrentPage }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setCurrentPage('jobs')}>
          <div className="flex items-center mb-4">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <h3 className="ml-3 text-xl font-bold text-gray-900">Top Jobs</h3>
          </div>
          <div className="space-y-3">
            {mockJobs.slice(0, 3).map(job => (
              <div key={job.id} className="border-l-4 border-indigo-600 pl-3">
                <p className="font-medium text-gray-900">{job.title}</p>
                <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-700">View all jobs →</button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setCurrentPage('scholarships')}>
          <div className="flex items-center mb-4">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <h3 className="ml-3 text-xl font-bold text-gray-900">Scholarships</h3>
          </div>
          <div className="space-y-3">
            {mockScholarships.slice(0, 3).map(scholarship => (
              <div key={scholarship.id} className="border-l-4 border-purple-600 pl-3">
                <p className="font-medium text-gray-900">{scholarship.title}</p>
                <p className="text-sm text-gray-600">{scholarship.country} • {scholarship.degreeLevel}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-purple-600 font-medium hover:text-purple-700">View all scholarships →</button>
        </div>

        {/* <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setCurrentPage('courses')}>
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-green-600" />
            <h3 className="ml-3 text-xl font-bold text-gray-900">Our Courses</h3>
          </div>
          <div className="space-y-3">
            {mockCourses.slice(0, 3).map(course => (
              <div key={course.id} className="border-l-4 border-green-600 pl-3">
                <p className="font-medium text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-600">{course.duration} • {course.price}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-green-600 font-medium hover:text-green-700">View all courses →</button>
        </div> */}
      </div>
    </section>
  );
}