import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import FloatingHelpButton from "../components/FloatingHelpButton";
import "../App.css";
import { FiFileText, FiCpu, FiSearch, FiMessageSquare } from "react-icons/fi";

const features = [
  {
    title: "1. Submit Report",
    text: "Share your experience anonymously through our secure platform. Your identity is protected.",
    color: "linear-gradient(135deg,#C7F9DB,#93E6D3)",
    icon: <FiFileText size={22} color="#0b3a2d" />,
  },
  {
    title: "2. AI Analysis",
    text: "Our system analyzes the severity and urgency of your situation to provide appropriate support.",
    color: "linear-gradient(135deg,#D2E6FF,#B6D4FF)",
    icon: <FiCpu size={22} color="#0b2b45" />,
  },
  {
    title: "3. Find Help",
    text: "Get connected with verified NGOs and legal aid services in your area that can help.",
    color: "linear-gradient(135deg,#FFE6F2,#FFD6E8)",
    icon: <FiSearch size={22} color="#3a2231" />,
  },
  {
    title: "4. Chat Support",
    text: "Connect with trained counselors who can provide immediate support and guidance.",
    color: "linear-gradient(135deg,#FFF3CC,#FFE0A8)",
    icon: <FiMessageSquare size={22} color="#5a3a12" />,
  },
];

export default function HomePage() {
  return (
    <div className="page-root">
      <Header />

      <main className="container">
        <Hero />

        <section className="about">
          <h3>About SafeVoice</h3>
          <p>
            SafeVoice is a secure, anonymous platform that connects harassment
            victims with verified support services and professional counseling.
          </p>
        </section>

        <section className="how-it-works">
          <h3>How It Works</h3>
          <div className="features-grid">
            {features.map((f, i) => (
              <FeatureCard
                key={i}
                title={f.title}
                text={f.text}
                color={f.color}
                icon={f.icon}
              />
            ))}
          </div>
        </section>

        <section className="stats-card">
          <h4>You are not alone</h4>
          <p>
            Our platform has helped thousands of individuals find the support
            they need. Every voice matters, and we're here to ensure yours is
            heard safely.
          </p>
          <div className="stats">
            <div>
              <strong>24/7</strong>
              <div>Support Available</div>
            </div>
            <div>
              <strong>100%</strong>
              <div>Anonymous</div>
            </div>
            <div>
              <strong>500+</strong>
              <div>Verified Partners</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingHelpButton />
    </div>
  );
}
