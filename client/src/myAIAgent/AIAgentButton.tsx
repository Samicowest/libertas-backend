import { MessageCircle } from "lucide-react";
import { useAIAgent } from "./context/AIAgentContext";

export default function AIAgentButton() {
  const { toggleOpen } = useAIAgent();

  return (
    <button
      onClick={toggleOpen}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-black text-white
        shadow-lg hover:scale-105
        transition
      "
      aria-label="Open AI Assistant"
    >
      <MessageCircle />
    </button>
  );
}
