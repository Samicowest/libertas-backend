import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AIAgentProvider } from "./myAIAgent";

// Global error listeners — catch any unhandled promise rejections and surface
// them clearly in the browser console. This catches errors like
// "Unexpected token '<'" before they silently disappear.
window.addEventListener('unhandledrejection', (event) => {
  console.error('[Global] Unhandled promise rejection:', event.reason);
});

window.addEventListener('error', (event) => {
  console.error('[Global] Uncaught error:', event.error ?? event.message);
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AIAgentProvider>
      <App />
    </AIAgentProvider>
  </QueryClientProvider>
);
