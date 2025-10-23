import React, { useState, useMemo } from 'react';
import { Search, Briefcase, GraduationCap, BookOpen, Mail, Menu, X, Calendar, MapPin, Building2, ExternalLink, Filter } from 'lucide-react';

const mockJobs = [
  { id: 1, title: 'Senior Software Engineer', company: 'TechCorp', location: 'Remote', country: 'USA', field: 'Technology', experience: 'Senior', url: '#', date: '2025-10-20' },
  { id: 2, title: 'Marketing Manager', company: 'GlobalBrand', location: 'London', country: 'UK', field: 'Marketing', experience: 'Mid-level', url: '#', date: '2025-10-19' },
  { id: 3, title: 'Data Scientist', company: 'DataCo', location: 'Berlin', country: 'Germany', field: 'Technology', experience: 'Mid-level', url: '#', date: '2025-10-18' },
  { id: 4, title: 'Product Designer', company: 'DesignHub', location: 'Dubai', country: 'UAE', field: 'Design', experience: 'Junior', url: '#', date: '2025-10-17' },
  { id: 5, title: 'Financial Analyst', company: 'FinanceGroup', location: 'Singapore', country: 'Singapore', field: 'Finance', experience: 'Mid-level', url: '#', date: '2025-10-16' },
  { id: 6, title: 'Content Writer', company: 'MediaPlus', location: 'Remote', country: 'Canada', field: 'Marketing', experience: 'Junior', url: '#', date: '2025-10-15' }
];

const mockScholarships = [
  { id: 1, title: 'Fulbright Scholarship', country: 'USA', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-11-30', url: '#' },
  { id: 2, title: 'Chevening Scholarship', country: 'UK', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-11-15', url: '#' },
  { id: 3, title: 'DAAD Scholarship', country: 'Germany', degreeLevel: 'PhD', field: 'Engineering', deadline: '2025-12-01', url: '#' },
  { id: 4, title: 'Australia Awards', country: 'Australia', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-12-15', url: '#' },
  { id: 5, title: 'Erasmus Mundus', country: 'Europe', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-11-20', url: '#' },
  { id: 6, title: 'Commonwealth Scholarship', country: 'UK', degreeLevel: 'PhD', field: 'Science', deadline: '2025-12-10', url: '#' }
];

const mockCourses = [
  { id: 1, title: 'Professional English Writing', description: 'Master business communication and professional writing skills', duration: '8 weeks', price: 'Free', instructor: 'Ameama' },
  { id: 2, title: 'Resume & Cover Letter Mastery', description: 'Create compelling applications that get you hired', duration: '4 weeks', price: 'Free', instructor: 'Abdullah' },
  { id: 3, title: 'Scholarship Application Success', description: 'Learn how to win competitive scholarships', duration: '6 weeks', price: '$49', instructor: 'Ameama & Abdullah' }
];

const mockBlogs = [
  { id: 1, title: 'How to Write a Winning Scholarship Essay', author: 'Ameama', date: '2025-10-15', excerpt: 'Learn the key strategies to craft compelling scholarship essays that stand out...' },
  { id: 2, title: 'Top 5 Global Job Platforms', author: 'Abdullah', date: '2025-10-10', excerpt: 'Discover the best platforms to find international job opportunities...' },
  { id: 3, title: 'Professional English Writing Tips', author: 'Ameama', date: '2025-10-05', excerpt: 'Improve your business communication with these essential writing tips...' },
  { id: 4, title: 'Navigating Remote Work Culture', author: 'Abdullah', date: '2025-10-01', excerpt: 'Essential tips for succeeding in remote work environments...' }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('jobs');
  const [jobFilters, setJobFilters] = useState({ field: '', country: '', experience: '' });
  const [scholarshipFilters, setScholarshipFilters] = useState({ country: '', degreeLevel: '', field: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'Jobs', page: 'jobs' },
    { name: 'Scholarships', page: 'scholarships' },
    { name: 'Courses', page: 'courses' },
    { name: 'Blog', page: 'blog' },
    { name: 'About', page: 'about' }
  ];

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesField = !jobFilters.field || job.field === jobFilters.field;
      const matchesCountry = !jobFilters.country || job.country === jobFilters.country;
      const matchesExperience = !jobFilters.experience || job.experience === jobFilters.experience;
      return matchesSearch && matchesField && matchesCountry && matchesExperience;
    });
  }, [searchQuery, jobFilters]);

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter(scholarship => {
      const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = !scholarshipFilters.country || scholarship.country === scholarshipFilters.country;
      const matchesDegree = !scholarshipFilters.degreeLevel || scholarship.degreeLevel === scholarshipFilters.degreeLevel;
      const matchesField = !scholarshipFilters.field || scholarship.field === scholarshipFilters.field;
      return matchesSearch && matchesCountry && matchesDegree && matchesField;
    });
  }, [searchQuery, scholarshipFilters]);

  const Header = () => (
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

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore opportunities. Expand your future.</h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">Your gateway to global jobs, scholarships, and professional courses</p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="px-4 py-3 text-gray-700 border-r border-gray-200 rounded-lg md:rounded-none md:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="jobs">Jobs</option>
                <option value="scholarships">Scholarships</option>
                <option value="courses">Courses</option>
              </select>
              <input type="text" placeholder={`Search ${searchCategory}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-3 text-gray-700 focus:outline-none" />
              <button onClick={() => setCurrentPage(searchCategory)} className="bg-indigo-600 text-white px-8 py-3 rounded-lg md:rounded-none md:rounded-r-lg hover:bg-indigo-700 transition-colors font-medium">
                <Search className="inline h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

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

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setCurrentPage('courses')}>
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
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="h-12 w-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-indigo-100 mb-6">Get the latest opportunities delivered to your inbox weekly</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white" />
            <button onClick={() => { alert(`Subscribed: ${newsletterEmail}`); setNewsletterEmail(''); }} className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const JobsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Opportunities</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <select value={jobFilters.field} onChange={(e) => setJobFilters({...jobFilters, field: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All Fields</option>
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
            </select>
            <select value={jobFilters.country} onChange={(e) => setJobFilters({...jobFilters, country: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Germany">Germany</option>
              <option value="UAE">UAE</option>
              <option value="Singapore">Singapore</option>
              <option value="Canada">Canada</option>
            </select>
            <select value={jobFilters.experience} onChange={(e) => setJobFilters({...jobFilters, experience: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All Levels</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center"><Building2 className="h-4 w-4 mr-1" />{job.company}</span>
                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{job.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">{job.field}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{job.experience}</span>
                  </div>
                </div>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 md:ml-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium inline-flex items-center">
                  Apply Now<ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );

  const ScholarshipsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Global Scholarships</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <select value={scholarshipFilters.country} onChange={(e) => setScholarshipFilters({...scholarshipFilters, country: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Germany">Germany</option>
              <option value="Australia">Australia</option>
              <option value="Europe">Europe</option>
            </select>
            <select value={scholarshipFilters.degreeLevel} onChange={(e) => setScholarshipFilters({...scholarshipFilters, degreeLevel: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">All Degrees</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
            <select value={scholarshipFilters.field} onChange={(e) => setScholarshipFilters({...scholarshipFilters, field: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">All Fields</option>
              <option value="All Fields">All Fields</option>
              <option value="Engineering">Engineering</option>
              <option value="Science">Science</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredScholarships.map(scholarship => (
            <div key={scholarship.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{scholarship.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600"><MapPin className="h-4 w-4 mr-2" /><span>{scholarship.country}</span></div>
                <div className="flex items-center text-gray-600"><GraduationCap className="h-4 w-4 mr-2" /><span>{scholarship.degreeLevel}</span></div>
                <div className="flex items-center text-gray-600"><Calendar className="h-4 w-4 mr-2" /><span>Deadline: {scholarship.deadline}</span></div>
              </div>
              <div className="mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">{scholarship.field}</span>
              </div>
              <a href={scholarship.url} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center">
                Learn More<ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No scholarships found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );

  const CoursesPage = () => (
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

  const BlogPage = () => (
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

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About CareerVerse</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            CareerVerse was founded with a simple yet powerful mission: to democratize access to global opportunities. 
            We believe that talent is universal, but opportunity is not. Our platform bridges this gap by connecting 
            ambitious individuals with jobs, scholarships, and educational resources from around the world.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet the Founders</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">A</div>
              <h3 className="text-xl font-bold text-gray-900">Abdullah</h3>
              <p className="text-gray-600">Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">A</div>
              <h3 className="text-xl font-bold text-gray-900">Ameama</h3>
              <p className="text-gray-600">Co-Founder</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows="4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your message..."></textarea>
            </div>
            <button onClick={() => { alert(`Message sent! From: ${contactName}`); setContactName(''); setContactEmail(''); setContactMessage(''); }} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminPanel = () => {
    if (!isAdminLoggedIn) {
      return (
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="admin@careerverse.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
                </div>
                <button onClick={() => { if (adminEmail === 'admin@careerverse.com' && adminPassword === 'admin123') { setIsAdminLoggedIn(true); } else { alert('Invalid credentials'); } }} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Login
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">Demo credentials: admin@careerverse.com / admin123</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={() => { setIsAdminLoggedIn(false); setAdminEmail(''); setAdminPassword(''); }} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Jobs</h3>
              <p className="text-3xl font-bold text-indigo-600">{mockJobs.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Scholarships</h3>
              <p className="text-3xl font-bold text-purple-600">{mockScholarships.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Courses</h3>
              <p className="text-3xl font-bold text-green-600">{mockCourses.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Blog Posts</h3>
              <p className="text-3xl font-bold text-orange-600">{mockBlogs.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">+ Add Job</button>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">+ Add Scholarship</button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">+ Add Course</button>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">+ Add Blog Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'jobs' && <JobsPage />}
      {currentPage === 'scholarships' && <ScholarshipsPage />}
      {currentPage === 'courses' && <CoursesPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'admin' && <AdminPanel />}
    </div>
  );
}

export default App;