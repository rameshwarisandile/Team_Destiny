import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingHelpButton from "../components/FloatingHelpButton";
import { FiFileText, FiCpu, FiSearch, FiMessageSquare } from "react-icons/fi";

// 🌈 Feature Data
const features = [
  {
    title: "Submit Report",
    text: "Share your experience anonymously through our secure platform. Your identity remains protected at all times.",
    bg: "bg-gradient-to-br from-teal-50 to-emerald-100",
    icon: <FiFileText size={28} className="text-emerald-600" />,
    link: "/submit-report",
  },
  {
    title: "AI Analysis",
    text: "Our AI reviews your report to provide the most relevant and immediate support resources.",
    bg: "bg-gradient-to-br from-sky-50 to-blue-100",
    icon: <FiCpu size={28} className="text-sky-600" />,
    link: "/ai-analysis",
  },
  {
    title: "Find Help",
    text: "Connect with verified NGOs, legal aid, and professional counselors in your area.",
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    icon: <FiSearch size={28} className="text-rose-600" />,
    link: "/find-help",
  },
  {
    title: "Chat Support",
    text: "Get instant guidance from our AI chatbot or trained human counselors available 24/7.",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-100",
    icon: <FiMessageSquare size={28} className="text-amber-600" />,
    link: "/chat-support",
  },
];

// ✨ Animation Presets
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HomePage = () => {
  return (
    <div className="bg-[#f9fafb] text-gray-800 font-inter overflow-hidden">
      {/* 🌈 Header */}
      <Header />

      {/* 🌤 Hero Section with Image */}
      <section
        className="relative h-[80vh] flex flex-col justify-center items-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#0b1f3a]/60 to-[#122a5a]/70"></div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Help. Find Hope.
          </motion.h1>

          <motion.p
            className="text-gray-100 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Connect with confidential helplines, NGOs, and expert guidance.
            Your safety, privacy, and voice matter.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/submit-report">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0a1a3a] font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
              >
                File a Report Securely
              </motion.button>
            </Link>

            <Link to="/chat-support">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#f72585] to-[#7209b7] text-white font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
              >
                Connect with AI Chatbot
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 💡 Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 text-[#0a1a3a]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          How It <span className="text-[#00bbf9]">Works</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Link to={feature.link}>
                <div
                  className={`${feature.bg} rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 text-center border border-gray-100`}
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-[#0a1a3a]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Stats Section */}
      <motion.section
        className="bg-gradient-to-b from-white to-[#eef3f8] py-16 text-center px-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-[#0a1a3a] mb-6">
          You’re Not Alone
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          SafeVoice has helped thousands find safety and support. You deserve to
          be heard — and we’re here for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { num: "24/7", label: "Support Available", color: "#00bbf9" },
            { num: "100%", label: "Anonymous", color: "#00f5d4" },
            { num: "500+", label: "Verified Partners", color: "#f72585" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <strong
                className="text-3xl block mb-1"
                style={{ color: stat.color }}
              >
                {stat.num}
              </strong>
              <span className="text-gray-700">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🌙 Footer */}
      <Footer />

      {/* 💬 Floating Help Button */}
      <FloatingHelpButton />
    </div>
  );
};

export default HomePage;
