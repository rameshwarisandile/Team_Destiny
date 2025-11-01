import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingHelpButton from "../components/FloatingHelpButton";
import { FiFileText, FiCpu, FiSearch, FiMessageSquare } from "react-icons/fi";

const features = [
  {
    title: "Submit Report",
    text: "Share your experience anonymously through our secure platform. Your identity remains protected at all times.",
    bg: "bg-gradient-to-br from-teal-50 to-emerald-100",
    icon: <FiFileText size={28} className="text-emerald-600" />,
  },
  {
    title: "AI Analysis",
    text: "Our AI reviews your report to provide the most relevant and immediate support resources.",
    bg: "bg-gradient-to-br from-sky-50 to-blue-100",
    icon: <FiCpu size={28} className="text-sky-600" />,
  },
  {
    title: "Find Help",
    text: "Connect with verified NGOs, legal aid, and professional counselors in your area.",
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    icon: <FiSearch size={28} className="text-rose-600" />,
  },
  {
    title: "Chat Support",
    text: "Get instant guidance from our AI chatbot or trained human counselors available 24/7.",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-100",
    icon: <FiMessageSquare size={28} className="text-amber-600" />,
  },
];

const HomePage = () => {
  return (
    <div className="bg-[#f9fafb] text-gray-800 font-inter">
      {/* 🌈 Header */}
      <Header />

      {/* 🌤 Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0b1f3a] to-[#122a5a] text-white py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
            Find Help. Find Hope.
          </h1>
          <p className="text-gray-200 mb-8">
            Connect with confidential helplines, NGOs, and expert guidance. Your safety, privacy, and voice matter.
          </p>

          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0a1a3a] font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all">
              File a Report Securely
            </button>
            <button className="bg-gradient-to-r from-[#f72585] to-[#7209b7] text-white font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Connect with AI Chatbot
            </button>
          </div>
        </div>
      </section>

      {/* 💡 Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#0a1a3a]">
          How It <span className="text-[#00bbf9]">Works</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`${feature.bg} rounded-2xl shadow-md hover:shadow-xl transition-all p-6 text-center border border-gray-100 hover:-translate-y-1`}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-[#0a1a3a]">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Stats Section */}
      <section className="bg-gradient-to-b from-white to-[#eef3f8] py-16 text-center px-6">
        <h3 className="text-3xl font-bold text-[#0a1a3a] mb-6">
          You’re Not Alone
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          SafeVoice has helped thousands find safety and support. You deserve to be heard — and we’re here for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <strong className="text-3xl text-[#00bbf9] block mb-1">24/7</strong>
            <span className="text-gray-700">Support Available</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <strong className="text-3xl text-[#00f5d4] block mb-1">100%</strong>
            <span className="text-gray-700">Anonymous</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <strong className="text-3xl text-[#f72585] block mb-1">500+</strong>
            <span className="text-gray-700">Verified Partners</span>
          </div>
        </div>
      </section>

      {/* 🌙 Footer */}
      <Footer />

      {/* 💬 Floating Help Button */}
      <FloatingHelpButton />
    </div>
  );
};

export default HomePage;
