import React from "react";
import { FiShield } from "react-icons/fi";
// If you'd like animated entrances using framer-motion, install it and re-enable the
// import below. For now we avoid the static import so Vite doesn't error when the
// dependency is not installed.
// import { motion as Motion } from 'framer-motion'

// Example variants (for reference):
// const heading = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
// const cta = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { delay: 0.18 } } }

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">
        <FiShield size={34} color="white" />
      </div>
      <h1>
        Speak safely.
        <br />
        Get support instantly.
      </h1>
      <p className="lead">
        Report harassment anonymously and find verified support near you.
      </p>
      <div className="hero-ctas">
        <button className="btn primary large">Report Anonymously</button>
        <button className="btn ghost large">Find Support</button>
      </div>
    </section>
  );
}
