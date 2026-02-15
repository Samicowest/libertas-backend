import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Certify from "./pages/Certify";
import Affiliate from "./pages/Affiliate";
import Opportunities from "./pages/Opportunities";
import Whitepaper from "./pages/Whitepaper";
import Contact from "./pages/Contact";

import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import AdminDashboard from "./pages/AdminDashboard";
import JobApplicationsAdmin from "./pages/JobApplicationsAdmin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AIAgent } from "./myAIAgent";
import AIAgentButton from "./myAIAgent/AIAgentButton";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/signup"} component={Signup} />
      <Route path={"/forgot-password"} component={ForgotPassword} />
      <Route path={"/reset-password"} component={ResetPassword} />
      {/* <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/certify"} component={Certify} />
      <Route path={"/affiliate"} component={Affiliate} />
      <Route path={"/opportunities"} component={Opportunities} />  */}
      <Route path={"/contact"} component={Contact} />
      <Route path={"/support"} component={Contact} />
      <Route path={"/whitepaper"} component={Whitepaper} />

      <Route path={"/about"} component={About} />
      <Route path={"/projects"} component={Projects} />
      {/* <Route path={"/projects/:slug"} component={ProjectDetail} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/job-applications"} component={JobApplicationsAdmin} />  */}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AIAgent />
      <AIAgentButton />
      <ThemeProvider
        defaultTheme="dark"
      // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
