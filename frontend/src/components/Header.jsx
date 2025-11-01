import React, { useState } from "react";
import { FiShield, FiMenu, FiX, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-[#e0f7fa] via-[#fdfbfb] to-[#e8f0fe] shadow-md fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* 🔰 Back icon (except on home) + Brand Logo */}
        <div className="flex items-center gap-3">
          {location && location.pathname !== "/" && (
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="p-2 rounded-md hover:bg-white/30 text-[#0b1f3a]"
            >
              <FiArrowLeft size={20} />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] flex items-center justify-center shadow-md">
            <FiShield size={22} color="#0b1f3a" />
          </div>
          <h1 className="text-xl font-extrabold text-[#0b1f3a] tracking-tight">
            Safe<span className="text-[#00bbf9]">Voice</span>
          </h1>
        </Link>

        </div>
        {/* 🌐 Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/find-help"
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#00bbf9] transition-colors"
            aria-label="Find support"
          >
            <FiMapPin className="text-[#00bbf9]" />
            <span>Find Support</span>
          </Link>

          <Link
            to="/submit-report"
            className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0b1f3a] shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            Report Anonymously
          </Link>
        </nav>

        {/* 📱 Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-[#0b1f3a] hover:bg-[#e0f7fa] transition"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
          <nav className="flex flex-col py-3 space-y-3 text-center">
            <Link
              to="/find-help"
              className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#00bbf9] transition"
              onClick={() => setMenuOpen(false)}
            >
              <FiMapPin className="text-[#00bbf9]" />
              <span>Find Support</span>
            </Link>

            <Link
              to="/submit-report"
              className="mx-auto w-[85%] px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0b1f3a] shadow-md hover:shadow-lg transition-transform hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Report Anonymously
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
