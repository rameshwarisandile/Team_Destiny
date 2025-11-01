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

		// NOTE: Replace this fetch with your real endpoint. Here we simulate a network request.
		try {
			await new Promise((res) => setTimeout(res, 800));
			// const res = await fetch('/api/reports', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
			// if (!res.ok) throw new Error('Failed to submit');

			setMessage("Report submitted anonymously. Thank you — we've received it.");
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
		<div className="bg-[#f9fafb] text-gray-800 font-inter min-h-screen">
			<Header />

			<main className="max-w-3xl mx-auto py-12 px-6">
				<h1 className="text-3xl font-bold mb-2">Report Anonymously</h1>
				<p className="text-gray-600 mb-6">
					SafeVoice keeps reports anonymous by default. Do not include names, phone numbers, or other personal identifiers in your description.
				</p>

				<form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
					{message && <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">{message}</div>}
					{error && <div className="mb-4 text-red-700 bg-red-50 p-3 rounded">{error}</div>}

					<label className="block mb-2 font-medium">Category</label>
					<select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded px-3 py-2 mb-4">
						<option value="">— Select a category —</option>
						<option value="harassment">Harassment</option>
						<option value="assault">Assault</option>
						<option value="stalking">Stalking</option>
						<option value="other">Other</option>
					</select>

					<label className="block mb-2 font-medium">When did this happen? (optional)</label>
					<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-3 py-2 mb-4" />

					<label className="block mb-2 font-medium">Location (optional)</label>
					<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or place" className="w-full border rounded px-3 py-2 mb-4" />

					<label className="block mb-2 font-medium">Incident description</label>
					<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded p-3 mb-3" rows={6} placeholder="Describe what happened — avoid personal identifiers"></textarea>

					<div className="mb-3">
						<label className="block mb-2 font-medium">Attachments (optional, up to 3 files)</label>
						<input type="file" onChange={handleFiles} multiple className="" />
						{attachments.length > 0 && (
							<div className="mt-2 text-sm text-gray-600">
								Selected: {attachments.map((f) => f.name).join(", ")}
							</div>
						)}
					</div>

					<div className="flex items-center justify-between mt-6">
						<div className="text-sm text-gray-500">All reports are anonymous and encrypted client-side before sending.</div>
						<div className="flex gap-3">
							<button type="submit" disabled={submitting} className="px-4 py-2 bg-[#00bbf9] text-white rounded disabled:opacity-60">
								{submitting ? "Submitting…" : "Submit anonymously"}
							</button>
							<button type="button" onClick={() => { setDescription(""); setAttachments([]); setCategory(""); setDate(""); setLocation(""); setMessage(null); setError(null); }} className="px-4 py-2 border rounded">
								Reset
							</button>
						</div>
					</div>
				</form>
			</main>

			<Footer />
		</div>
	);
}
