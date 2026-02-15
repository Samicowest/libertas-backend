import { useState, useRef, useEffect } from "react";
import { useAIAgent } from "../context/AIAgentContext";
import { COMMON_QUESTIONS } from "../constants/commonQuestions";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Brain, Sparkles, Trash2 } from "lucide-react";

export default function AIAgent() {
  const { isOpen, messages, addMessage, clearChat, toggleOpen } = useAIAgent();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  if (!isOpen) return null;

  async function sendMessage(text: string) {
    if (!text.trim() || isPending) return;

    addMessage({ role: "user", content: text });
    setInput("");
    setIsPending(true);

    // Mock AI response
    setTimeout(() => {
      addMessage({
        role: "assistant",
        content: `I'm currently in 'Offline Mode' as the backend has been detached. However, I can still tell you that Libertas Alpha is dedicated to decentralized value creation and sustainable growth!`,
      });
      setIsPending(false);
    }, 1000);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: "bottom right" }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-24 right-6 z-50 w-[360px] h-[600px] bg-[#0A0628]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight leading-none">Thinking Coach</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] text-white/40 uppercase tracking-[0.15em] font-black">Powered by Data</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              title="Clear all messages"
              className="p-2.5 rounded-xl hover:bg-white/10 text-white/30 hover:text-red-400 transition-all active:scale-90"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleOpen}
              title="Close Assistant"
              className="p-2.5 rounded-xl hover:bg-white/10 text-white/30 hover:text-white transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-2"
            >
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Assistant</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  Welcome to the Libertas Alpha ecosystem. I can guide you through our mission, ventures like MVI, and our roadmap for Africa's RWA revolution.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">
                  Suggested Topics
                </h4>
                <div className="grid gap-2">
                  {COMMON_QUESTIONS.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[13px] text-white/60 hover:text-white p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left group flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{q}</span>
                      <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed font-medium ${msg.role === "user"
                  ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-xl shadow-purple-500/10 rounded-tr-none"
                  : "bg-white/10 border border-white/10 text-white shadow-lg rounded-tl-none"
                  }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 rounded-tl-none">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 bg-gradient-to-t from-black/40 to-transparent">
          <div className="relative group">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-[13px] text-white placeholder-white/20 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all"
              placeholder="Ask the coach..."
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isPending || !input.trim()}
              className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white disabled:opacity-20 transition-all flex items-center justify-center shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-center text-white/20 mt-4 tracking-tight">
            Libertas Alpha Thinking Coach v1.0
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
