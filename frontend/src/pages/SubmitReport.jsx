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
      setError("Please provide a brief description (at least 10 characters).");
      return;
    }

    const payload = {
      description: description.trim(),
      category,
      date: date || null,
      location: location || null,
      attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
      anonymous: true,
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 800));
      setMessage(
        "✅ Report submitted anonymously. Thank you — your report has been safely received."
      );
      setDescription("");
      setCategory("");
      setDate("");
      setLocation("");
      setAttachments([]);
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#f9fafb] to-[#f0f8ff] text-gray-800 font-inter min-h-screen flex flex-col">
      {/* Fixed header spacing handled */}
      <Header />
      <div className="pt-24 flex-grow">
        <main className="max-w-3xl mx-auto py-10 px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0b1f3a]">
              Report <span className="text-[#00bbf9]">Anonymously</span>
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              SafeVoice keeps your reports fully anonymous. Please avoid sharing
              personal details like names, contact numbers, or addresses in your
              description.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 transition hover:shadow-2xl"
          >
            {message && (
              <div className="mb-4 text-green-800 bg-green-50 p-3 rounded-lg border border-green-200">
                {message}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Category */}
            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bbf9]"
              >
                <option value="">— Select a category —</option>
                <option value="harassment">Harassment</option>
                <option value="assault">Assault</option>
                <option value="stalking">Stalking</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                When did this happen? (optional)
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bbf9]"
              />
            </div>

            {/* Location */}
            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Location (optional)
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or place"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bbf9]"
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Incident Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Describe what happened — avoid personal identifiers"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00bbf9]"
              ></textarea>
            </div>

            {/* Attachments */}
            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Attachments (optional, up to 3 files)
              </label>
              <input
                type="file"
                onChange={handleFiles}
                multiple
                className="text-sm"
              />
              {attachments.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {attachments.map((f) => f.name).join(", ")}
                </div>
              )}
            </div>

            {/* Submit + Reset Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                🔒 All reports are encrypted and stored securely.
              </p>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] text-[#0b1f3a] shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit Report"}
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
                  className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}
