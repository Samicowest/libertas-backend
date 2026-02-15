import { createContext, useContext, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AIAgentContextType = {
  isOpen: boolean;
  toggleOpen: () => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearChat: () => void;
};

const AIAgentContext = createContext<AIAgentContextType | null>(null);

export function AIAgentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const addMessage = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);
  const clearChat = () => setMessages([]);

  return (
    <AIAgentContext.Provider
      value={{ isOpen, toggleOpen, messages, addMessage, clearChat }}
    >
      {children}
    </AIAgentContext.Provider>
  );
}

export function useAIAgent() {
  const ctx = useContext(AIAgentContext);
  if (!ctx) {
    throw new Error("useAIAgent must be used inside AIAgentProvider");
  }
  return ctx;
}
