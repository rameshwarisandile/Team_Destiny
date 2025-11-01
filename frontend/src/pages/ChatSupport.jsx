import React, { useState, useRef, useEffect } from "react";

// SupportChat.jsx
// Single-file React component built with Tailwind CSS.
// Drop this file into a React app that already has Tailwind configured.

export default function SupportChat() {
  const [messages, setMessages] = useState(() => {
    // sample initial messages
    return [
      {
        id: 1,
        sender: "system",
        text:
          "Welcome — you are in a confidential harassment support chat. If you are in immediate danger, call local emergency services.",
        time: new Date().toISOString(),
      },
      {
        id: 2,
        sender: "agent",
        text:
          "Hi — I'm here to listen. When you're ready, tell me as much or as little as you'd like. You can also use the quick buttons below.",
        time: new Date().toISOString(),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    // auto-scroll
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage(e) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed && attachments.length === 0) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
      time: new Date().toISOString(),
    };

    setSending(true);
    setMessages((m) => [...m, newMsg]);
    setInput("");
    setAttachments([]);

    // Try to send to backend AI endpoint. If it fails, fall back to the mock reply.
    (async () => {
      try {
        const resp = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });

        if (!resp.ok) throw new Error("AI endpoint returned error");

        const data = await resp.json();
        const aiText = (data && (data.reply || data.text || data.message)) || null;

        if (aiText) {
          const reply = {
            id: Date.now() + 1,
            sender: "agent",
            text: aiText,
            time: new Date().toISOString(),
          };
          setMessages((m) => [...m, reply]);
          setSending(false);
          return;
        }

        throw new Error("No reply from AI");
      } catch (err) {
        // Fallback mock reply
        const reply = {
          id: Date.now() + 1,
          sender: "agent",
          text:
            "Thank you for sharing that. Would you like resources, a safety plan, or to talk about what happened in more detail?",
          time: new Date().toISOString(),
        };
        setMessages((m) => [...m, reply]);
        setSending(false);
      }
    })();
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files).slice(0, 3); // limit attachments
    setAttachments(files);
  }

  function quickInsert(text) {
    setInput((s) => (s ? s + " " + text : text));
  }

  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="max-w-4xl mx-auto h-[80vh] bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
      {/* Left: Chat area */}
      <main className="flex-1 flex flex-col">
        <header className="px-4 py-3 border-b flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">📞</div>
            <div>
              <h1 className="font-semibold">Harassment Support — Confidential Chat</h1>
              <p className="text-sm opacity-90">Secure channel • You're not alone</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <div>Local Crisis Line: <span className="font-medium">If immediate danger, call emergency services</span></div>
          </div>
        </header>

        <section ref={listRef} className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m) => (
            <div key={m.id} className="max-w-3xl mx-auto">
              {m.sender === "system" && (
                <div className="text-center text-xs text-gray-600">{m.text}</div>
              )}

              {m.sender === "agent" && (
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">A</div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm">{m.text}</div>
                    <div className="text-xs text-gray-400 mt-2">{formatTime(m.time)}</div>
                  </div>
                </div>
              )}

              {m.sender === "user" && (
                <div className="flex justify-end">
                  <div className="bg-indigo-600 text-white p-3 rounded-lg shadow-sm max-w-[80%] break-words">
                    <div className="text-sm">{m.text}</div>
                    {m.attachments && m.attachments.length > 0 && (
                      <ul className="mt-2 text-xs">
                        {m.attachments.map((a, i) => (
                          <li key={i} className="opacity-90">📎 {a.name} • {Math.round(a.size/1024)} KB</li>
                        ))}
                      </ul>
                    )}
                    <div className="text-xs text-white/80 mt-2">{formatTime(m.time)}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        <form onSubmit={sendMessage} className="p-4 border-t bg-white">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label htmlFor="message" className="sr-only">Type your message</label>
              <textarea
                id="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                className="w-full resize-none border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Type something—it's okay to write a little at a time"
                aria-label="Type your message"
              />

              {attachments.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Attached: {attachments.map((a) => a.name).join(", ")}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <input
                id="file"
                type="file"
                accept="image/*,application/pdf,text/plain"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file" className="text-sm px-3 py-2 border rounded-lg cursor-pointer">Attach</label>

              <button
                type="submit"
                disabled={sending}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <button type="button" onClick={() => quickInsert("I need immediate safety advice")}
              className="px-3 py-1 border rounded-full text-gray-700">Immediate safety</button>
            <button type="button" onClick={() => quickInsert("I want to report harassment")}
              className="px-3 py-1 border rounded-full text-gray-700">Report</button>
            <button type="button" onClick={() => quickInsert("I need emotional support")}
              className="px-3 py-1 border rounded-full text-gray-700">Emotional support</button>
          </div>
        </form>
      </main>

      {/* Right: Resources + quick actions */}
      <aside className="w-full md:w-96 border-l bg-gradient-to-b from-white to-gray-50 p-4 flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Quick Resources</h2>
          <p className="text-sm text-gray-600">Links & actions you can use without leaving the chat.</p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium">Safety Planning</h3>
            <p className="text-sm text-gray-600 mt-1">Short checklist and steps to protect yourself.</p>
            <button className="mt-3 w-full text-left px-3 py-2 border rounded-lg">Open safety checklist</button>
          </div>

          <div className="p-3 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium">Legal & Reporting</h3>
            <p className="text-sm text-gray-600 mt-1">How to preserve evidence, next steps for reporting.</p>
            <button className="mt-3 w-full text-left px-3 py-2 border rounded-lg">Get legal options</button>
          </div>

          <div className="p-3 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium">Self-care & Helplines</h3>
            <p className="text-sm text-gray-600 mt-1">Immediate helplines and coping strategies.</p>
            <button className="mt-3 w-full text-left px-3 py-2 border rounded-lg">View helplines</button>
          </div>
        </div>

        <div className="mt-auto text-xs text-gray-500">
          <p>
            Confidentiality note: This chat is intended for support. Do not share passwords or other sensitive account
            details. If you believe you are in immediate danger, call local emergency services.
          </p>
        </div>
      </aside>
    </div>
  );
}