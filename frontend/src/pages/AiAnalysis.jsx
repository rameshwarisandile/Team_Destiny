import React from "react";
import { FiCpu, FiLock, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AiAnalysis() {
  return (
    <div className="bg-gradient-to-b from-[#f9fafb] to-[#eef6ff] text-gray-800 font-inter min-h-screen flex flex-col">
      {/* 🧭 Header */}
      <Header />

      {/* 🌈 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#00bbf9] via-[#00f5d4] to-[#9b5de5] text-white py-24 text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-md shadow-lg">
              <FiCpu size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            AI-Powered Report Analysis
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-4 max-w-2xl mx-auto">
            Harnessing artificial intelligence to analyze reports securely,
            identify risk levels, and connect you with the right help.
          </p>
        </div>
      </section>

      {/* 💡 Info Section */}
      <main className="max-w-5xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0a1a3a]">
            How <span className="text-[#00bbf9]">SafeVoice AI</span> Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Each report goes through multiple analysis layers using advanced NLP
            and anonymization techniques. Your privacy remains 100% protected.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FiLock className="text-[#00bbf9]" size={28} />,
              title: "Secure Data Processing",
              desc: "Reports are encrypted and processed anonymously to ensure maximum privacy.",
            },
            {
              icon: <FiTrendingUp className="text-[#9b5de5]" size={28} />,
              title: "AI-Based Prioritization",
              desc: "The AI model prioritizes cases by urgency and type to ensure quick assistance.",
            },
            {
              icon: <FiCheckCircle className="text-[#00f5d4]" size={28} />,
              title: "Personalized Recommendations",
              desc: "You receive curated resources — nearby NGOs, legal help, or safety planning steps.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100 text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg text-[#0a1a3a] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* 🔍 Example Output Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-md border border-gray-100 shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#0a1a3a] mb-4">
            What You’ll Receive
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Once your report is analyzed, our AI recommends trusted NGOs,
            counseling support, and legal aid — all while maintaining your
            anonymity.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-[#e0faff] to-[#c8f7ff] rounded-xl shadow-sm">
              <h4 className="font-semibold text-[#00bbf9]">Safety Resources</h4>
              <p className="text-sm text-gray-600 mt-1">
                Crisis hotlines & survivor helplines.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#f4eaff] to-[#e8ddff] rounded-xl shadow-sm">
              <h4 className="font-semibold text-[#9b5de5]">Counseling</h4>
              <p className="text-sm text-gray-600 mt-1">
                Connect with trained mental health counselors.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#fff8e7] to-[#fff1c9] rounded-xl shadow-sm">
              <h4 className="font-semibold text-[#ffb703]">Legal Aid</h4>
              <p className="text-sm text-gray-600 mt-1">
                Access verified legal support organizations.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 🌙 Footer */}
      <Footer />
    </div>
  );
}
