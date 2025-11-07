import React, { useState } from 'react';

export default function AboutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    alert(`Message sent! From: ${name}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
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
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your message..."></textarea>
            </div>
            <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}