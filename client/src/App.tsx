import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AIAgent } from "./myAIAgent";
import AIAgentButton from "./myAIAgent/AIAgentButton";

// ─── Lazy page imports — each page becomes its own chunk ─────────────────────
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Contact = lazy(() => import("./pages/Contact"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Commented-out pages kept lazy-ready for when you re-enable them
// const Dashboard          = lazy(() => import("./pages/Dashboard"));
// const Certify            = lazy(() => import("./pages/Certify"));
// const Affiliate          = lazy(() => import("./pages/Affiliate"));
// const Opportunities      = lazy(() => import("./pages/Opportunities"));
// const ProjectDetail      = lazy(() => import("./pages/ProjectDetail"));
// const AdminDashboard     = lazy(() => import("./pages/AdminDashboard"));
// const JobApplicationsAdmin = lazy(() => import("./pages/JobApplicationsAdmin"));

// ─── Route-level loading fallback ────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "var(--background, #0a0a0a)",
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: "3px solid rgba(255,255,255,0.1)",
        borderTop: "3px solid #fff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Router() {
  return (
    // Suspense catches the lazy-load promise while each chunk downloads
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        {/* <Route path="/dashboard"    component={Dashboard} />
            <Route path="/certify"      component={Certify} />
            <Route path="/affiliate"    component={Affiliate} />
            <Route path="/opportunities" component={Opportunities} /> */}
        <Route path="/contact" component={Contact} />
        <Route path="/support" component={Contact} />
        <Route path="/whitepaper" component={Whitepaper} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        {/* <Route path="/projects/:slug"          component={ProjectDetail} />
            <Route path="/admin"                   component={AdminDashboard} />
            <Route path="/admin/job-applications"  component={JobApplicationsAdmin} /> */}
        <Route path="/404" component={NotFound} />
        {/* Final fallback */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), then change color palette in index.css
// - If you want to make theme switchable, pass `switchable` to ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AIAgent />
      <AIAgentButton />
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
