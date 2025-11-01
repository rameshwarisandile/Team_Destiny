import React, { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiShield,
  FiHeart,
  FiPaperclip,
  FiX,
} from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SupportChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text:
        "Welcome — you’re in a confidential harassment support chat. If you are in immediate danger, please call emergency services.",
      time: new Date().toISOString(),
    },
    {
      id: 2,
      sender: "agent",
      text:
        "Hi, I’m your support agent. You can share what happened, or tap one of the quick options below. This chat is safe and anonymous 💬",
      time: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [sending, setSending] = useState(false);
  const [agentTyping, setAgentTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setAttachments((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    setPreviews((prev) => {
      const updated = [...prev];
      const removed = updated.splice(index, 1);
      if (removed[0] && removed[0].url) URL.revokeObjectURL(removed[0].url);
      return updated;
    });
  };

  const sendMessage = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text && attachments.length === 0) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text,
      attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
      time: new Date().toISOString(),
    };

    setMessages((m) => [...m, newMsg]);
    setInput("");
    setSending(true);
    setAgentTyping(true);

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "agent",
        text:
          "Thank you for reaching out. You're not alone. Would you like safety advice, emotional support, or to file an anonymous report?",
        time: new Date().toISOString(),
      };
      setMessages((m) => [...m, reply]);
      setSending(false);
      setAgentTyping(false);
      setAttachments([]);
      setPreviews([]);
    }, 1800);
  };

  return (
    <div className="bg-gradient-to-b from-[#f9fbff] to-[#eef5ff] text-gray-800 font-inter min-h-screen flex flex-col">
      <Header />

      {/* 🌈 Chat Section */}
      <main className="pt-24 pb-24 flex-grow">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#e0f2ff]">
            {/* 💬 Left: Chat Window */}
            <section className="flex-1 flex flex-col bg-gradient-to-b from-white via-[#f9fbff] to-[#eef6ff]">
              <header className="px-6 py-4 border-b bg-gradient-to-r from-[#00bbf9] to-[#9b5de5] text-white shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-full shadow">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg">SafeVoice — Confidential Chat</h1>
                    <p className="text-xs opacity-90">
                      Private, anonymous & encrypted
                    </p>
                  </div>
                </div>
                <p className="text-xs font-light">💡 You are safe here</p>
              </header>

              {/* Chat Messages */}
              <div ref={listRef} className="flex-1 overflow-auto p-6 space-y-4 bg-[#f8faff]">
                {messages.map((m) => (
                  <div key={m.id} className="max-w-3xl mx-auto">
                    {m.sender === "system" && (
                      <div className="text-center text-sm text-gray-600 italic">
                        {m.text}
                      </div>
                    )}
                    {m.sender === "agent" && (
                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#e6f0ff] flex items-center justify-center text-[#4f46e5] font-semibold shadow">
                          A
                        </div>
                        <div className="bg-white border border-[#e5ecff] p-3 rounded-2xl shadow-sm">
                          <div className="text-sm text-gray-700">{m.text}</div>
                          <div className="text-xs text-gray-400 mt-2">
                            {formatTime(m.time)}
                          </div>
                        </div>
                      </div>
                    )}
                    {m.sender === "user" && (
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-[#00bbf9] to-[#9b5de5] text-white p-3 rounded-2xl shadow-sm max-w-[80%]">
                          <div className="text-sm">{m.text}</div>
                          {m.attachments?.length > 0 && (
                            <ul className="mt-2 text-xs text-white/90">
                              {m.attachments.map((a, i) => (
                                <li key={i}>📎 {a.name} ({Math.round(a.size / 1024)} KB)</li>
                              ))}
                            </ul>
                          )}
                          <div className="text-xs text-white/80 mt-2 text-right">
                            {formatTime(m.time)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {agentTyping && (
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#e6f0ff] flex items-center justify-center text-[#4f46e5] font-semibold shadow">
                      A
                    </div>
                    <div className="bg-white border border-[#e5ecff] p-3 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-300"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input + Attachments */}
              <form onSubmit={sendMessage} className="p-4 border-t bg-white/80 backdrop-blur-lg">
                <div className="flex items-end gap-3">
                  {/* Attachment Input */}
                  <div className="relative">
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,application/pdf,text/plain"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer p-3 rounded-full border border-[#d0e7ff] hover:bg-[#eef7ff] text-[#0077b6] transition"
                    >
                      <FiPaperclip size={18} />
                    </label>
                  </div>

                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={2}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[#00bbf9] text-sm bg-[#f9fbff]"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="p-3 bg-gradient-to-r from-[#00bbf9] to-[#9b5de5] text-white rounded-full shadow-lg hover:scale-105 transition-all"
                  >
                    <FiSend size={18} />
                  </button>
                </div>

                {/* File Previews */}
                {previews.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {previews.map((p, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-16 border rounded-md overflow-hidden shadow-sm"
                      >
                        {p.type.startsWith("image/") ? (
                          <img
                            src={p.url}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs p-2 bg-gray-50 text-gray-600">
                            {p.name}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAttachment(i)}
                          className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full p-[2px] shadow"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick buttons */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {["Safety help", "Report harassment", "Emotional support"].map(
                    (txt) => (
                      <button
                        key={txt}
                        type="button"
                        onClick={() => setInput(txt)}
                        className="px-3 py-1 border border-[#d0e7ff] rounded-full hover:bg-[#e7f4ff] text-gray-700"
                      >
                        {txt}
                      </button>
                    )
                  )}
                </div>
              </form>
            </section>

            {/* 📚 Right: Helpful Sidebar */}
            <aside className="w-full md:w-96 border-l bg-gradient-to-b from-[#fdfdff] to-[#f4f8ff] p-6 flex flex-col gap-4">
              <div className="mb-2">
                <h2 className="text-lg font-bold text-[#0a1a3a] flex items-center gap-2">
                  <FiHeart className="text-[#ff477e]" /> Quick Resources
                </h2>
                <p className="text-sm text-gray-600">
                  Trusted support tools & helplines — confidential and free.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl shadow-sm border">
                  <h3 className="font-medium text-[#00bbf9]">Safety Planning</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Steps to secure your environment and prepare for safety.
                  </p>
                  <button className="mt-3 w-full text-left px-3 py-2 border rounded-lg text-sm hover:bg-[#e9f8ff]">
                    Open Safety Guide
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-sm border">
                  <h3 className="font-medium text-[#9b5de5]">Legal & Reporting</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Learn about your rights and safe reporting processes.
                  </p>
                  <button className="mt-3 w-full text-left px-3 py-2 border rounded-lg text-sm hover:bg-[#f1e9ff]">
                    View Legal Options
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-sm border">
                  <h3 className="font-medium text-[#ff477e]">Helplines</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Talk with mental health or crisis professionals anytime.
                  </p>
                  <button className="mt-3 w-full text-left px-3 py-2 border rounded-lg text-sm hover:bg-[#fff0f6]">
                    View Helplines
                  </button>
                </div>
              </div>

              <div className="mt-auto text-xs text-gray-500 leading-relaxed">
                <p>
                  🔒 Confidentiality note: Your messages are encrypted and not
                  stored permanently. If you’re in danger, call local emergency
                  services immediately.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
