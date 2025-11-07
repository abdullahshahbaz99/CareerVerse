import React, { useState, useMemo } from 'react';
import { 
  Filter, Building2, MapPin, Calendar, ExternalLink, 
  Search, DollarSign, Clock, Bookmark, Share2, 
  TrendingUp, Award, Users, ChevronDown, X, Star
} from 'lucide-react';

const mockJobs = [
  { id: 1, title: 'Senior Software Engineer', company: 'TechCorp', location: 'Remote', country: 'USA', field: 'Technology', experience: 'Senior', url: '#', date: '2025-10-20', salary: '$120k - $180k', type: 'Full-time', featured: true, urgent: false },
  { id: 2, title: 'Marketing Manager', company: 'GlobalBrand', location: 'London', country: 'UK', field: 'Marketing', experience: 'Mid-level', url: '#', date: '2025-10-19', salary: '£50k - £70k', type: 'Full-time', featured: false, urgent: true },
  { id: 3, title: 'Data Scientist', company: 'DataCo', location: 'Berlin', country: 'Germany', field: 'Technology', experience: 'Mid-level', url: '#', date: '2025-10-18', salary: '€60k - €85k', type: 'Full-time', featured: true, urgent: false },
  { id: 4, title: 'Product Designer', company: 'DesignHub', location: 'Dubai', country: 'UAE', field: 'Design', experience: 'Junior', url: '#', date: '2025-10-17', salary: 'AED 120k - 180k', type: 'Contract', featured: false, urgent: false },
  { id: 5, title: 'Financial Analyst', company: 'FinanceGroup', location: 'Singapore', country: 'Singapore', field: 'Finance', experience: 'Mid-level', url: '#', date: '2025-10-16', salary: 'SGD 70k - 95k', type: 'Full-time', featured: false, urgent: true },
  { id: 6, title: 'Content Writer', company: 'MediaPlus', location: 'Remote', country: 'Canada', field: 'Marketing', experience: 'Junior', url: '#', date: '2025-10-15', salary: 'CAD 45k - 60k', type: 'Part-time', featured: false, urgent: false },
  { id: 7, title: 'DevOps Engineer', company: 'CloudTech', location: 'San Francisco', country: 'USA', field: 'Technology', experience: 'Senior', url: '#', date: '2025-10-14', salary: '$140k - $200k', type: 'Full-time', featured: true, urgent: true },
  { id: 8, title: 'UX Researcher', company: 'UserFirst', location: 'Amsterdam', country: 'Netherlands', field: 'Design', experience: 'Mid-level', url: '#', date: '2025-10-13', salary: '€55k - €75k', type: 'Full-time', featured: false, urgent: false }
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilters, setJobFilters] = useState({ 
    field: '', 
    country: '', 
    experience: '',
    type: '',
    featured: false 
  });
  const [showFilters, setShowFilters] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  const filteredJobs = useMemo(() => {
    let filtered = mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesField = !jobFilters.field || job.field === jobFilters.field;
      const matchesCountry = !jobFilters.country || job.country === jobFilters.country;
      const matchesExperience = !jobFilters.experience || job.experience === jobFilters.experience;
      const matchesType = !jobFilters.type || job.type === jobFilters.type;
      const matchesFeatured = !jobFilters.featured || job.featured;
      return matchesSearch && matchesField && matchesCountry && matchesExperience && matchesType && matchesFeatured;
    });

    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, jobFilters, sortBy]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const clearFilters = () => {
    setJobFilters({ field: '', country: '', experience: '', type: '', featured: false });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(jobFilters).filter(v => v).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Discover Your Dream Job</h1>
              <p className="text-indigo-100 text-lg">
                {filteredJobs.length} opportunities waiting for you
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{mockJobs.length}</div>
                <div className="text-xs text-indigo-100">Total Jobs</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Award className="h-6 w-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{mockJobs.filter(j => j.featured).length}</div>
                <div className="text-xs text-indigo-100">Featured</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search jobs, companies, or keywords..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={jobFilters.featured}
                      onChange={(e) => setJobFilters({...jobFilters, featured: e.target.checked})}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Featured Jobs Only
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Field</label>
                  <select 
                    value={jobFilters.field} 
                    onChange={(e) => setJobFilters({...jobFilters, field: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Fields</option>
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select 
                    value={jobFilters.country} 
                    onChange={(e) => setJobFilters({...jobFilters, country: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Countries</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="UAE">UAE</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Canada">Canada</option>
                    <option value="Netherlands">Netherlands</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                  <select 
                    value={jobFilters.experience} 
                    onChange={(e) => setJobFilters({...jobFilters, experience: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Levels</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                  <select 
                    value={jobFilters.type} 
                    onChange={(e) => setJobFilters({...jobFilters, type: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-gray-700 font-medium"
              >
                <Filter className="h-5 w-5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                {activeFilterCount > 0 && (
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <span className="text-sm text-gray-600">
                  Showing <span className="font-bold text-gray-900">{filteredJobs.length}</span> jobs
                </span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="recent">Most Recent</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                    job.featured ? 'border-yellow-400' : 'border-transparent hover:border-indigo-200'
                  }`}
                >
                  {job.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 flex items-center gap-2">
                      <Star className="h-3 w-3 fill-current" />
                      FEATURED JOB
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                            {job.company.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors">
                                {job.title}
                              </h3>
                              {job.urgent && (
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                                  URGENT
                                </span>
                              )}
                            </div>
                            <p className="text-lg text-gray-700 font-semibold mt-1">{job.company}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <MapPin className="h-4 w-4 text-indigo-600" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Clock className="h-4 w-4 text-purple-600" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Calendar className="h-4 w-4 text-orange-600" />
                            {job.date}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                            {job.field}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            {job.experience}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {job.country}
                          </span>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2">
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            savedJobs.includes(job.id)
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600'
                          }`}
                          title={savedJobs.includes(job.id) ? 'Saved' : 'Save job'}
                        >
                          <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          className="p-3 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                          title="Share job"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <a 
                        href={job.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button 
                  onClick={clearFilters}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {savedJobs.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-6 w-6 fill-current" />
                    <div>
                      <h3 className="font-bold text-lg">Saved Jobs</h3>
                      <p className="text-indigo-100 text-sm">You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                    View All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}