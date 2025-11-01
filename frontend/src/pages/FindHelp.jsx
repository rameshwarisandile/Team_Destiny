import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSearch,
  FiNavigation,
} from "react-icons/fi";

const SAMPLE_NGOS = [
  {
    id: 1,
    name: "Women Support Center",
    type: "Counseling",
    phone: "+91-9876543210",
    city: "New Delhi",
    address: "123 Main St",
    email: "help@women.org",
  },
  {
    id: 2,
    name: "Legal Aid Foundation",
    type: "Legal",
    phone: "+91-9123456780",
    city: "Mumbai",
    address: "45 Legal Ave",
    email: "legal@aid.org",
  },
  {
    id: 3,
    name: "Safe Counseling",
    type: "Counseling",
    phone: "+91-9988776655",
    city: "Bengaluru",
    address: "78 Care Rd",
    email: "counsel@safe.org",
  },
];

export default function FindHelp() {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNgos();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNgos(ngos);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredNgos(
        ngos.filter(
          (ngo) =>
            ngo.city.toLowerCase().includes(q) ||
            ngo.name.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, ngos]);

  const fetchNgos = async () => {
    setLoading(true);
    try {
      // Simulate API or fallback data
      await new Promise((res) => setTimeout(res, 600));
      setNgos(SAMPLE_NGOS);
      setFilteredNgos(SAMPLE_NGOS);
    } catch (error) {
      console.error("Error fetching NGOs:", error);
      setNgos(SAMPLE_NGOS);
      setFilteredNgos(SAMPLE_NGOS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f9fafb] via-[#eef7ff] to-[#e0f4ff] text-gray-800 font-inter min-h-screen flex flex-col">
      <Header />

      {/* 🌈 Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute w-72 h-72 bg-[#00bbf9] rounded-full mix-blend-multiply filter blur-3xl animate-pulse top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-[#f72585] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-300 bottom-10 right-10"></div>
      </div>

      {/* 🌍 Main Section */}
      <main className="flex-grow pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b1f3a] mb-3 animate-fadeIn">
            Find <span className="text-[#00bbf9]">Help Near You</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fadeIn delay-200">
            Search and connect with verified NGOs, legal aid organizations, and
            emotional support centers — all here to help you.
          </p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by city or organization name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00bbf9] focus:outline-none bg-white shadow-sm"
            />
          </div>
        </div>

        {/* NGO Cards Section */}
        {loading ? (
          <div className="text-center py-10 text-gray-500 animate-pulse">
            Loading verified NGOs...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNgos.map((ngo, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[#0b1f3a]">
                    {ngo.name}
                  </h3>
                  <span className="text-xs font-medium bg-[#00bbf9]/10 text-[#00bbf9] px-2 py-1 rounded-full">
                    {ngo.type}
                  </span>
                </div>

                <p className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <FiMapPin className="text-[#00bbf9]" /> {ngo.address},{" "}
                  {ngo.city}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <FiPhone className="text-[#f72585]" /> {ngo.phone}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <FiMail className="text-[#122a5a]" /> {ngo.email}
                </p>

                <button className="mt-4 w-full bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0b1f3a] font-semibold py-2 rounded-md shadow hover:scale-105 transition">
                  Contact Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 🌐 Info Section */}
        <div className="mt-16 bg-white/80 border border-gray-100 rounded-2xl shadow-md p-8 text-center animate-fadeIn delay-300">
          <h2 className="text-2xl font-bold text-[#0b1f3a] mb-3">
            Need More Options?
          </h2>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">
            Explore our complete directory of verified organizations and
            counseling centers across India.
          </p>
          <Link
            to="/find-support"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0b1f3a] font-semibold px-6 py-2.5 rounded-lg shadow-md hover:scale-105 transition-all"
          >
            <FiNavigation />
            Open Full Directory
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
