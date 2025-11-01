import React from "react";
import { FiShield, FiHeart, FiLinkedin, FiTwitter, FiMail, FiBookOpen } from "react-icons/fi";
// Imported FiBookOpen for the new Legal section

export default function Footer() {
  // Define main colors for consistency
  const PRIMARY_COLOR = "#00bbf9"; // Light Blue/Cyan for highlights
  const TEXT_COLOR = "#1f2937"; // Dark Gray for main text
  const SUBTLE_COLOR = "#6b7280"; // Medium Gray for subtext

  return (
    <footer
      // Brighter, softer gradient background
      className="bg-gradient-to-t from-white via-[#f3f9ff] to-[#e6f2ff] text-slate-700 border-t border-sky-100"
      role="contentinfo"
      aria-label="SafeVoice footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 🔷 Top Section: Grid Layout */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* 1. Brand Info & Mission (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Enhanced Logo Icon with a gentle shadow */}
              <div className="p-3 rounded-xl bg-white shadow-lg border border-sky-200">
                <FiShield className="text-pink-500" size={24} /> 
              </div>
              <span className="text-3xl font-extrabold text-[#0b1f3a] tracking-tight">
                SafeVoice
              </span>
            </div>
            <p className="text-base text-slate-600 leading-relaxed max-w-sm">
              Empowering individuals through anonymous, AI-powered reporting and
              compassionate support. **Privacy first — always.**
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`text-slate-400 hover:text-blue-600 transition duration-300 hover:scale-110`}
                aria-label="SafeVoice on LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`text-slate-400 hover:text-sky-400 transition duration-300 hover:scale-110`}
                aria-label="SafeVoice on X (Twitter)"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h5 className={`text-lg font-bold text-slate-800 mb-4 border-b-2 border-pink-100 pb-1`}>
              Quick Access
            </h5>
            <ul className="space-y-3 text-base text-slate-600">
              <li>
                <a href="/report" className="hover:text-pink-500 transition hover:underline">
                  File a Report
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-pink-500 transition hover:underline">
                  Chat Support
                </a>
              </li>
              <li>
                <a href="/ai-analysis" className="hover:text-pink-500 transition hover:underline">
                  AI Analysis
                </a>
              </li>
              <li>
                <a href="/find-help" className="hover:text-pink-500 transition hover:underline">
                  Find Help
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Legal & Transparency (New Essential Section) */}
          <div>
            <h5 className={`text-lg font-bold text-slate-800 mb-4 border-b-2 border-pink-100 pb-1`}>
              Legal & Privacy
            </h5>
            <ul className="space-y-3 text-base text-slate-600">
              <li>
                <a href="/privacy" className="hover:text-pink-500 transition hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-pink-500 transition hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/security" className="hover:text-pink-500 transition hover:underline">
                  Security Measures
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-pink-500 transition hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          {/* 4. Contact Info */}
          <div>
            <h5 className={`text-lg font-bold text-slate-800 mb-4 border-b-2 border-pink-100 pb-1`}>
              Contact
            </h5>
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                For partnerships or official inquiries:
              </p>
              <a
                href="mailto:support@safevoice.org"
                className={`inline-flex items-center gap-2 text-base font-semibold text-slate-700 hover:text-blue-500 transition`}
              >
                <FiMail size={18} className="text-blue-500" /> support@safevoice.org
              </a>
              <div className="text-sm text-slate-500 flex items-center gap-2 pt-2">
                <FiHeart size={16} className="text-red-400" /> Made with compassion
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 border-t border-sky-200" />

        {/* 🔒 Bottom Bar: Copyright & Anonymity Pledge */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
          
          {/* Anonymity Pledge */}
          <div className="bg-[#e6faff] border border-sky-100 rounded-lg px-4 py-3 text-sm text-[#0a1a3a] shadow-md max-w-lg mx-auto md:mx-0">
            <strong className="font-semibold text-sky-600">Anonymity Pledge:</strong> We do not collect or store any personal
            identity information. Every report is fully **encrypted** and **anonymous**.
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-500 order-first md:order-last">
            &copy; {new Date().getFullYear()} SafeVoice. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}