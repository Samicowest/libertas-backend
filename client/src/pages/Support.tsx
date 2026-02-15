import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Headphones, Send, AlertCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

/**
 * Support Page - AI chatbox and human support escalation
 */
export default function Support() {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm the Libertas Alpha AI Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showEscalation, setShowEscalation] = useState(false);
  const [escalationReason, setEscalationReason] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground mb-4">Please log in to access this page.</p>
          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // AI Training Data - Libertas Alpha Knowledge Base
  const aiKnowledgeBase = {
    greetings: [
      "Hello! I'm the Libertas Alpha AI Assistant. How can I help you today?",
      "Welcome to Libertas Alpha support! What can I assist you with?",
      "Hi there! I'm here to help with any questions about Libertas Alpha.",
    ],
    topics: {
      about: [
        "Libertas Alpha is an organization dedicated to empowering growth, fostering innovation, and driving excellence across digital and physical realms. Our mission is to create sustainable impact through advanced technology and transformative solutions.",
        "We believe in 'Congratulations!!! You have found FREEDOM.' - this represents our commitment to empowering individuals and organizations.",
      ],
      ventures: [
        "Libertas Alpha operates three main ventures: 1) Micro Ventures Initiative (LIVE) - empowering grassroots entrepreneurs through blockchain tokenization, 2) Libertas Estate (COMING SOON) - real estate tokenization platform, 3) Tradex (COMING SOON) - trading and commerce platform.",
      ],
      programs: [
        "We offer several programs: Certify (training tracks with SBNFT minting), Affiliate (earn commissions as a product affiliate), Build Opportunities (explore projects and jobs), and Contact Support (24/7 assistance).",
      ],
      blockchain: [
        "Yes, Libertas Alpha uses blockchain technology for tokenization, enabling fractional ownership of real-world assets, DeFi solutions, and Web3 integration.",
      ],
      getting_started: [
        "To get started, log in to your dashboard, explore the Certify program for training, apply for the Affiliate program, or browse Build Opportunities for projects and jobs.",
      ],
      medium: [
        "You can read more about Libertas Alpha on our Medium publication at https://medium.com/@libertasalpha_10290. We share insights on blockchain, sustainable development, and innovation.",
      ],
    },
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Check for specific keywords and provide relevant responses
    if (input.includes("about") || input.includes("what is")) {
      return aiKnowledgeBase.topics.about[0];
    }
    if (input.includes("venture") || input.includes("initiative")) {
      return aiKnowledgeBase.topics.ventures[0];
    }
    if (input.includes("program") || input.includes("certify") || input.includes("affiliate")) {
      return aiKnowledgeBase.topics.programs[0];
    }
    if (input.includes("blockchain") || input.includes("crypto") || input.includes("token")) {
      return aiKnowledgeBase.topics.blockchain[0];
    }
    if (input.includes("start") || input.includes("begin") || input.includes("how")) {
      return aiKnowledgeBase.topics.getting_started[0];
    }
    if (input.includes("medium") || input.includes("article") || input.includes("blog")) {
      return aiKnowledgeBase.topics.medium[0];
    }

    // Default response
    return "Thank you for your question! For more detailed assistance, please escalate to our human support team via WhatsApp. They can provide personalized help with your specific needs.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Generate AI response based on training data
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleEscalate = (e: React.FormEvent) => {
    e.preventDefault();
    // Open WhatsApp chat with Libertas Alpha support
    const whatsappUrl = "https://wa.me/message/P7RK34R5WPSHB1";
    window.open(whatsappUrl, "_blank");
    setShowEscalation(false);
    setEscalationReason("");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0E0741', color: '#FFFFFF' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#ABABB9' }}>
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/libertas-logo-white.png" alt="Libertas Alpha" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold flex-1">Contact Support</h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl h-screen md:h-auto md:max-h-[600px] flex flex-col bg-card/50 border border-border rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="border-b border-border px-6 py-4 bg-card">
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#FFFFFF' }}>
              <Headphones className="w-5 h-5 text-accent" />
              AI Support Assistant
            </h2>
            <p className="text-sm mt-1" style={{ color: '#ABABB9' }}>
              Available 24/7 • Escalate to human support anytime
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-border"
                  }`}
                  style={message.sender !== "user" ? { color: '#FFFFFF' } : {}}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Escalation Form */}
          {showEscalation && (
            <div className="border-t border-border px-6 py-4 bg-accent/5">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium" style={{ color: '#FFFFFF' }}>Connect via WhatsApp</p>
                  <p className="text-sm mt-1" style={{ color: '#ABABB9' }}>
                    Click below to chat with our support team on WhatsApp for personalized assistance.
                  </p>
                </div>
              </div>
              <form onSubmit={handleEscalate} className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-border text-foreground hover:bg-card"
                    onClick={() => setShowEscalation(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Chat Input */}
          <div className="border-t border-border px-6 py-4 bg-card">
            {!showEscalation ? (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about Libertas Alpha, programs, ventures, or blockchain..."
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-green-600 text-green-400 hover:bg-green-600/10 flex items-center gap-1"
                  onClick={() => setShowEscalation(true)}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </form>
            ) : null}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12" style={{ borderColor: '#ABABB9', color: '#ABABB9' }}>
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2025 Libertas Alpha Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

