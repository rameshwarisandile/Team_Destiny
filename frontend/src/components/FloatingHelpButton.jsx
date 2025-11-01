import React from "react";
import { FiMessageCircle } from "react-icons/fi";

export default function FloatingHelpButton() {
  return (
    <a className="floating-help" href="#" aria-label="Get help">
      <FiMessageCircle size={26} />
    </a>
  );
}
