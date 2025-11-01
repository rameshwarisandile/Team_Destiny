import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiMapPin as MapPin, FiPhone as Phone, FiMail as Mail, FiSearch as Search, FiNavigation as NavigationIcon } from 'react-icons/fi';

const SAMPLE_NGOS = [
  { id: 1, name: 'Women Support Center', type: 'Counseling', phone: '+91-9876543210', city: 'New Delhi', address: '123 Main St', email: 'help@women.org' },
  { id: 2, name: 'Legal Aid Foundation', type: 'Legal', phone: '+91-9123456780', city: 'Mumbai', address: '45 Legal Ave', email: 'legal@aid.org' },
  { id: 3, name: 'Safe Counseling', type: 'Counseling', phone: '+91-9988776655', city: 'Bengaluru', address: '78 Care Rd', email: 'counsel@safe.org' },
];

export default function FindHelp() {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNgos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNgos(ngos);
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = ngos.filter(
        (ngo) => ngo.city.toLowerCase().includes(q) || ngo.name.toLowerCase().includes(q)
      );
      setFilteredNgos(filtered);
    }
  }, [searchQuery, ngos]);

  const fetchNgos = async () => {
    setLoading(true);
    try {
      // If a supabase client exists in the global scope use it, otherwise use sample data
      if (typeof supabase !== 'undefined' && supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase.from('ngos').select('*').eq('verified', true).order('city');
        if (error) throw error;
        setNgos(data || []);
        setFilteredNgos(data || []);
      } else {
        // fallback to local sample data
        setNgos(SAMPLE_NGOS);
        setFilteredNgos(SAMPLE_NGOS);
      }
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      setNgos(SAMPLE_NGOS);
      setFilteredNgos(SAMPLE_NGOS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9fafb] text-gray-800 font-inter min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold mb-4">Find Help Near You</h1>
        <p className="text-gray-600 mb-6">
          Search and connect with verified NGOs, legal aid organizations, and counselors.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold">Local NGOs</h2>
            <p className="text-sm text-gray-600 mt-2">List of nearby organizations and contact details (placeholder).</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold">Legal Help</h2>
            <p className="text-sm text-gray-600 mt-2">Guidance on legal resources and preservation of evidence.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Browse verified support organizations</h3>
          <p className="text-sm text-gray-600 mb-4">For a searchable directory with contact and filter options, open the full support directory.</p>
          <Link to="/find-support" className="inline-block px-4 py-2 bg-[#00bbf9] text-white rounded">Open Support Directory</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
