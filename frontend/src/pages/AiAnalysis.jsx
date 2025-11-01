import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AiAnalysis() {
	return (
		<div className="bg-[#f9fafb] text-gray-800 font-inter min-h-screen">
			<Header />

			<main className="max-w-4xl mx-auto py-20 px-6">
				<h1 className="text-3xl font-bold mb-4">AI Report Analysis</h1>
				<p className="text-gray-600 mb-6">
					Our analysis helps identify nearby resources and recommended next steps based on the information you provide. This page is a placeholder — wire the AI endpoint here when ready.
				</p>

				<div className="bg-white rounded-xl shadow p-6">
					<h2 className="font-semibold mb-2">How it works</h2>
					<ol className="list-decimal list-inside text-gray-700 space-y-1">
						<li>We process the anonymous report securely.</li>
						<li>We match relevant resources, safety planning, and legal options.</li>
						<li>You receive a tailored suggestions list without revealing identity.</li>
					</ol>
				</div>
			</main>

			<Footer />
		</div>
	);
}
