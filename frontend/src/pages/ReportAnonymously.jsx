import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

export default function ReportAnonymously() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const org = params.get("org");
    if (org && !text) {
      setText(`Reporting incident related to ${org}: `);
    }
  }, [location.search]);

  function handleSubmit(e) {
    e.preventDefault();
    // For now simulate a submit; integrate backend as needed.
    if (!text.trim()) return;
    setSent(true);
    setTimeout(() => setText(""), 300);
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-inter">
      <Header />

      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-2">Report Anonymously</h1>
        <p className="text-gray-600 mb-6">
          Use this secure form to submit an anonymous report. Do not include names or personally identifying information.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
          {sent && <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">Report submitted anonymously.</div>}

          <label className="block mb-2 font-medium">Your report</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full border rounded p-3 mb-4"
            placeholder="Describe what happened without personal identifiers"
          />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setText("")} className="px-4 py-2 border rounded">
              Reset
            </button>
            <button type="submit" className="px-4 py-2 bg-[#00bbf9] text-white rounded">
              Submit anonymously
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
