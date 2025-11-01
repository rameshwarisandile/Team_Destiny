    import React from "react";
import { FiMail, FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-t from-[#f9fafb] via-[#f0f8ff] to-white border-t border-sky-100 text-gray-700 font-inter"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* 🔹 Footer Navigation Section */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-[#0b1f3a] mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/submit-report" className="hover:text-[#00bbf9] transition">
                  Report Anonymously
                </a>
              </li>
              <li>
                <a href="/find-help" className="hover:text-[#00bbf9] transition">
                  Find Help
                </a>
              </li>
              <li>
                <a href="/ai-analysis" className="hover:text-[#00bbf9] transition">
                  AI Analysis
                </a>
              </li>
              <li>
                <a href="/chat-support" className="hover:text-[#00bbf9] transition">
                  Chat Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-lg font-semibold text-[#0b1f3a] mb-3">
              Legal & Privacy
            </h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/privacy" className="hover:text-[#00bbf9] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#00bbf9] transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/security" className="hover:text-[#00bbf9] transition">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-lg font-semibold text-[#0b1f3a] mb-3">
              Support
            </h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/contact" className="hover:text-[#00bbf9] transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-[#00bbf9] transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/partners" className="hover:text-[#00bbf9] transition">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold text-[#0b1f3a] mb-3">
              Reach Us
            </h5>
            <div className="space-y-3 text-sm text-gray-600">
              <a
                href="mailto:support@safevoice.org"
                className="inline-flex items-center gap-2 hover:text-[#00bbf9] transition"
              >
                <FiMail className="text-[#00bbf9]" size={16} /> support@safevoice.org
              </a>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                <FiHeart className="text-pink-500" /> Made with compassion ❤️
              </p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="my-8 border-sky-100" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SafeVoice. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
