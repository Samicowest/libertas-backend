import { Brain } from "lucide-react";
import { useAIAgent } from "../context/AIAgentContext";

export default function AIAgentButton() {
  const { toggleOpen } = useAIAgent();

  return (
    <button
      onClick={toggleOpen}
      aria-label="Open Libertas AI Assistant"
      className="
        fixed bottom-6 right-6 z-50
        px-6 h-14 rounded-full
        flex items-center justify-center gap-3
        bg-gradient-to-r from-cyan-600 to-blue-600 
        hover:from-cyan-500 hover:to-blue-500
        text-white font-medium
        shadow-lg shadow-cyan-500/25
        hover:scale-105 active:scale-95
        transition-all duration-300
        group
      "
    >
      <Brain className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline">AI Thinking Coach</span>
    </button>
  );
}
