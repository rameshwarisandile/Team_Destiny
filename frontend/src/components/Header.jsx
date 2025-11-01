import React from "react";
import { FiShield } from "react-icons/fi";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="brand">
          <div className="logo-circle">
            <FiShield size={18} color="white" />
          </div>
          <div className="brand-text">SafeVoice</div>
        </div>
        <nav className="header-nav">
          <button className="btn ghost">Find Support</button>
          <button className="btn primary">Report Anonymously</button>
        </nav>
      </div>
    </header>
  );
}
