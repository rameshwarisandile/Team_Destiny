import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Optional: AOS (Animate On Scroll) can be used for scroll-reveal effects.
// If you want to enable it, first run `npm install aos` in the frontend folder
// then uncomment the import lines below and the `AOS.init(...)` call.
// import AOS from 'aos'
// import 'aos/dist/aos.css'
// AOS.init({ once: true, duration: 600 })

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
