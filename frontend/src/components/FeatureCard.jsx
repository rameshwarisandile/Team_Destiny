import React from "react";
// Optional: to add a hover lift using framer-motion, install framer-motion and
// uncomment the import below and change the outer <div> to <Motion.div>.
// import { motion as Motion } from 'framer-motion'

export default function FeatureCard({ title, text, color, icon }) {
  return (
    <div className="feature-card">
      <div
        className="icon"
        style={{
          background: color || "linear-gradient(135deg,#e6f7f1,#d1efe6)",
        }}
      >
        <div className="icon-inner">{icon}</div>
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}
