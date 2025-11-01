import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SubmitReport() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function handleFiles(e) {
    const files = Array.from(e.target.files).slice(0, 3);
    setAttachments(files);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!description.trim() || description.trim().length < 10) {
      setError("⚠️ Please describe the incident in at least 10 characters.");
      return;
    }
    setSubmitting(true);

    try {
      // Build FormData for multipart upload
      const form = new FormData();
      form.append('description', description.trim());
      if (category) form.append('category', category);
      if (date) form.append('date', date);
      if (location) form.append('location', location);
      form.append('anonymous', 'true');
      form.append('submittedAt', new Date().toISOString());

      // append up to 5 files (backend allows up to 5)
      (attachments || []).slice(0, 5).forEach((file) => {
        form.append('attachments', file, file.name);
      });

      const resp = await fetch('http://localhost:4000/api/reports', {
        method: 'POST',
        body: form,
      });

      if (!resp.ok) {
        const txt = await resp.text().catch(() => null);
        throw new Error(txt || `Server returned ${resp.status}`);
      }

      const data = await resp.json().catch(() => null);
      setMessage(
        data && data.ok
          ? `✅ Report submitted (id: ${data.id}). Thank you — your report was received.`
          : '✅ Report submitted. Thank you.'
      );

      // reset form
      setDescription('');
      setCategory('');
      setDate('');
      setLocation('');
      setAttachments([]);
    } catch (err) {
      console.error('submit error', err);
      setError('❌ Submission failed. Please ensure the backend is running (http://localhost:4000) and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#f9fafb] via-[#eef7ff] to-[#dff5ff] text-gray-800 font-inter min-h-screen flex flex-col">
      <Header />

      {/* 💫 Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute w-72 h-72 bg-[#00bbf9] rounded-full mix-blend-multiply filter blur-3xl animate-pulse top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-[#f72585] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-300 bottom-10 right-10"></div>
      </div>

      {/* Main Section */}
      <main className="pt-28 pb-20 flex-grow px-4">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0b1f3a] animate-fadeIn">
              Report <span className="text-[#00bbf9]">Anonymously</span>
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto animate-fadeIn delay-200">
              SafeVoice keeps your reports **fully anonymous**. Please avoid sharing
              personal details like names, phone numbers, or addresses.
            </p>
          </div>

          {/* Status Messages */}
          {message && (
            <div className="mb-4 text-green-800 bg-green-50 border border-green-200 p-3 rounded-lg animate-bounce-in">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg animate-bounce-in">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <label className="block font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bbf9] bg-white"
              >
                <option value="">— Select a category —</option>
                <option value="harassment">Harassment</option>
                <option value="assault">Assault</option>
                <option value="stalking">Stalking</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <label className="block font-semibold text-gray-700 mb-2">
                When did this happen? (optional)
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bbf9] focus:outline-none bg-white"
              />
            </div>

            {/* Location */}
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <label className="block font-semibold text-gray-700 mb-2">
                Location (optional)
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, place, or area"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bbf9] bg-white"
              />
            </div>

            {/* Description */}
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <label className="block font-semibold text-gray-700 mb-2">
                Incident Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Describe what happened — please avoid personal identifiers"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#00bbf9] bg-white"
              ></textarea>
            </div>

            {/* Attachments */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Attachments (optional, up to 3 files)
              </label>
              <input type="file" onChange={handleFiles} multiple className="text-sm" />
              {attachments.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  📎 Selected: {attachments.map((f) => f.name).join(", ")}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                🔒 All reports are encrypted and stored securely.
              </p>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0b1f3a] shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Report"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDescription("");
                    setAttachments([]);
                    setCategory("");
                    setDate("");
                    setLocation("");
                    setMessage(null);
                    setError(null);
                  }}
                  className="px-6 py-2.5 rounded-lg border text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
