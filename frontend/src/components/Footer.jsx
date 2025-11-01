import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand-small">SafeVoice</div>
          <p>
            Anonymous reporting and support platform for harassment victims.
            Safe, confidential, and supportive.
          </p>
        </div>
        <div>
          <h5>Partner Organizations</h5>
          <ul>
            <li>Women Support Center</li>
            <li>Legal Aid Foundation</li>
          </ul>
        </div>
        <div>
          <h5>Legal</h5>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="footer-note container">
        Important: SafeVoice does not store personal identities. All reports are
        anonymous and encrypted.
      </div>
    </footer>
  );
}
