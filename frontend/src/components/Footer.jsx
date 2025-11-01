// ...existing code...
import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-b from-white to-slate-50 text-slate-700 border-t border-slate-100"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="text-2xl font-semibold text-slate-900">SafeVoice</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-md">
              Anonymous reporting and support platform for harassment victims.
              Safe, confidential, and supportive.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-900 mb-3">Partner Organizations</h5>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#partners" className="hover:underline">Women Support Center</a>
              </li>
              <li>
                <a href="#partners" className="hover:underline">Legal Aid Foundation</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-900 mb-3">Legal</h5>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">Terms of Service</a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-sky-50/60 border border-sky-100 rounded-md px-4 py-3 text-sm text-slate-800">
          Important: SafeVoice does not store personal identities. All reports are anonymous and encrypted.
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div>© {new Date().getFullYear()} SafeVoice — All rights reserved.</div>
          <div className="hidden sm:block">Built with care for safety and privacy.</div>
        </div>
      </div>
    </footer>
  );
}
// ...existing code...