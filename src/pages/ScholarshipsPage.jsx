import React, { useState, useMemo } from 'react';
import { 
  Filter, MapPin, GraduationCap, Calendar, ExternalLink, 
  Search, DollarSign, Globe, Bookmark, Share2, 
  TrendingUp, Award, Users, Clock, Star, BookOpen, Target
} from 'lucide-react';

const mockScholarships = [
  { id: 1, title: 'Fulbright Scholarship', country: 'USA', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-11-30', url: '#', amount: 'Full Funding', duration: '2 years', featured: true, sponsored: 'US Government', applicants: '5000+', acceptance: '15%' },
  { id: 2, title: 'Chevening Scholarship', country: 'UK', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-11-15', url: '#', amount: '£18,000/year', duration: '1 year', featured: true, sponsored: 'UK Government', applicants: '3000+', acceptance: '20%' },
  { id: 3, title: 'DAAD Scholarship', country: 'Germany', degreeLevel: 'PhD', field: 'Engineering', deadline: '2025-12-01', url: '#', amount: '€1,200/month', duration: '3-4 years', featured: false, sponsored: 'DAAD', applicants: '2500+', acceptance: '25%' },
  { id: 4, title: 'Australia Awards', country: 'Australia', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-12-15', url: '#', amount: 'Full Funding', duration: '2 years', featured: true, sponsored: 'Australian Govt', applicants: '4000+', acceptance: '18%' },
  { id: 5, title: 'Erasmus Mundus', country: 'Europe', degreeLevel: 'Masters', field: 'All Fields', deadline: '2025-11-20', url: '#', amount: '€1,000/month', duration: '2 years', featured: false, sponsored: 'EU Commission', applicants: '6000+', acceptance: '12%' },
  { id: 6, title: 'Commonwealth Scholarship', country: 'UK', degreeLevel: 'PhD', field: 'Science', deadline: '2025-12-10', url: '#', amount: 'Full Funding', duration: '3 years', featured: false, sponsored: 'Commonwealth', applicants: '3500+', acceptance: '22%' },
  { id: 7, title: 'Swiss Government Excellence', country: 'Switzerland', degreeLevel: 'PhD', field: 'All Fields', deadline: '2025-11-25', url: '#', amount: 'CHF 1,920/month', duration: '3 years', featured: true, sponsored: 'Swiss Govt', applicants: '2000+', acceptance: '30%' },
  { id: 8, title: 'Gates Cambridge', country: 'UK', degreeLevel: 'PhD', field: 'All Fields', deadline: '2025-12-05', url: '#', amount: 'Full Funding', duration: '3-4 years', featured: true, sponsored: 'Gates Foundation', applicants: '7000+', acceptance: '10%' }
];

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarshipFilters, setScholarshipFilters] = useState({ 
    country: '', 
    degreeLevel: '', 
    field: '',
    fundingType: '',
    featured: false 
  });
  const [showFilters, setShowFilters] = useState(true);
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [sortBy, setSortBy] = useState('deadline');

  const filteredScholarships = useMemo(() => {
    let filtered = mockScholarships.filter(scholarship => {
      const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           scholarship.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           scholarship.field.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = !scholarshipFilters.country || scholarship.country === scholarshipFilters.country;
      const matchesDegree = !scholarshipFilters.degreeLevel || scholarship.degreeLevel === scholarshipFilters.degreeLevel;
      const matchesField = !scholarshipFilters.field || scholarship.field === scholarshipFilters.field;
      const matchesFunding = !scholarshipFilters.fundingType || 
        (scholarshipFilters.fundingType === 'full' && scholarship.amount.toLowerCase().includes('full')) ||
        (scholarshipFilters.fundingType === 'partial' && !scholarship.amount.toLowerCase().includes('full'));
      const matchesFeatured = !scholarshipFilters.featured || scholarship.featured;
      return matchesSearch && matchesCountry && matchesDegree && matchesField && matchesFunding && matchesFeatured;
    });

    if (sortBy === 'deadline') {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'acceptance') {
      filtered.sort((a, b) => parseFloat(b.acceptance) - parseFloat(a.acceptance));
    }

    return filtered;
  }, [searchQuery, scholarshipFilters, sortBy]);

  const toggleSaveScholarship = (scholarshipId) => {
    setSavedScholarships(prev => 
      prev.includes(scholarshipId) 
        ? prev.filter(id => id !== scholarshipId)
        : [...prev, scholarshipId]
    );
  };

  const clearFilters = () => {
    setScholarshipFilters({ country: '', degreeLevel: '', field: '', fundingType: '', featured: false });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(scholarshipFilters).filter(v => v).length;

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Global Scholarship Opportunities</h1>
              <p className="text-purple-100 text-lg">
                {filteredScholarships.length} scholarships available worldwide
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{mockScholarships.length}</div>
                <div className="text-xs text-purple-100">Total Scholarships</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Award className="h-6 w-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{mockScholarships.filter(s => s.featured).length}</div>
                <div className="text-xs text-purple-100">Featured</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-2xl p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search scholarships, countries, or fields..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                Search Scholarships
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Featured Toggle */}
                <div>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={scholarshipFilters.featured}
                      onChange={(e) => setScholarshipFilters({...scholarshipFilters, featured: e.target.checked})}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Featured Only
                    </span>
                  </label>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country/Region</label>
                  <select 
                    value={scholarshipFilters.country} 
                    onChange={(e) => setScholarshipFilters({...scholarshipFilters, country: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Countries</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="Europe">Europe</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>
                </div>

                {/* Degree Level Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Degree Level</label>
                  <select 
                    value={scholarshipFilters.degreeLevel} 
                    onChange={(e) => setScholarshipFilters({...scholarshipFilters, degreeLevel: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Degrees</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Undergraduate">Undergraduate</option>
                  </select>
                </div>

                {/* Field Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Field of Study</label>
                  <select 
                    value={scholarshipFilters.field} 
                    onChange={(e) => setScholarshipFilters({...scholarshipFilters, field: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Fields</option>
                    <option value="All Fields">All Fields</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Science">Science</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>

                {/* Funding Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Type</label>
                  <select 
                    value={scholarshipFilters.fundingType} 
                    onChange={(e) => setScholarshipFilters({...scholarshipFilters, fundingType: e.target.value})} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Types</option>
                    <option value="full">Full Funding</option>
                    <option value="partial">Partial Funding</option>
                  </select>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Funding:</span>
                    <span className="font-semibold text-purple-600">
                      {mockScholarships.filter(s => s.amount.includes('Full')).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Masters:</span>
                    <span className="font-semibold text-purple-600">
                      {mockScholarships.filter(s => s.degreeLevel === 'Masters').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PhD:</span>
                    <span className="font-semibold text-purple-600">
                      {mockScholarships.filter(s => s.degreeLevel === 'PhD').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarship Listings */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-gray-700 font-medium"
              >
                <Filter className="h-5 w-5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                {activeFilterCount > 0 && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <span className="text-sm text-gray-600">
                  Showing <span className="font-bold text-gray-900">{filteredScholarships.length}</span> scholarships
                </span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="deadline">Deadline (Soonest)</option>
                  <option value="featured">Featured First</option>
                  <option value="acceptance">Acceptance Rate</option>
                </select>
              </div>
            </div>

            {/* Scholarship Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredScholarships.map(scholarship => {
                const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                const isUrgent = daysLeft <= 30 && daysLeft > 0;
                
                return (
                  <div 
                    key={scholarship.id} 
                    className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                      scholarship.featured ? 'border-yellow-400' : 'border-transparent hover:border-purple-200'
                    }`}
                  >
                    {scholarship.featured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 flex items-center gap-2">
                        <Star className="h-3 w-3 fill-current" />
                        FEATURED SCHOLARSHIP
                      </div>
                    )}
                    
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors mb-2">
                            {scholarship.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Globe className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">{scholarship.sponsored}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleSaveScholarship(scholarship.id)}
                            className={`p-2 rounded-lg border-2 transition-all ${
                              savedScholarships.includes(scholarship.id)
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : 'border-gray-200 text-gray-600 hover:border-purple-600 hover:text-purple-600'
                            }`}
                            title={savedScholarships.includes(scholarship.id) ? 'Saved' : 'Save scholarship'}
                          >
                            <Bookmark className={`h-4 w-4 ${savedScholarships.includes(scholarship.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            className="p-2 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-purple-600 hover:text-purple-600 transition-all"
                            title="Share scholarship"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-2 rounded-lg">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-gray-700">{scholarship.country}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-700">{scholarship.degreeLevel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-green-50 px-3 py-2 rounded-lg">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-gray-700">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-orange-50 px-3 py-2 rounded-lg">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-gray-700">{scholarship.duration}</span>
                        </div>
                      </div>

                      {/* Field Tag */}
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                          {scholarship.field}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                            <Users className="h-3 w-3" />
                            <span>Applicants</span>
                          </div>
                          <div className="font-bold text-gray-900">{scholarship.applicants}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                            <Target className="h-3 w-3" />
                            <span>Acceptance</span>
                          </div>
                          <div className="font-bold text-green-600">{scholarship.acceptance}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                            <Calendar className="h-3 w-3" />
                            <span>Deadline</span>
                          </div>
                          <div className={`font-bold ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                            {daysLeft > 0 ? `${daysLeft}d` : 'Closed'}
                          </div>
                        </div>
                      </div>

                      {/* Deadline Alert */}
                      {isUrgent && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <p className="text-xs text-red-700 font-medium">
                            Deadline: {scholarship.deadline} - Apply soon!
                          </p>
                        </div>
                      )}

                      {/* Apply Button */}
                      <a 
                        href={scholarship.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        View Details
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredScholarships.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No scholarships found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button 
                  onClick={clearFilters}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Saved Scholarships Counter */}
            {savedScholarships.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-6 w-6 fill-current" />
                    <div>
                      <h3 className="font-bold text-lg">Saved Scholarships</h3>
                      <p className="text-purple-100 text-sm">
                        You have {savedScholarships.length} saved scholarship{savedScholarships.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
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