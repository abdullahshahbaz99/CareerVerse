import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-indigo-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="h-12 w-12 text-white mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-indigo-100 mb-6">Get the latest opportunities delivered to your inbox weekly</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white" />
          <button onClick={handleSubscribe} className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
