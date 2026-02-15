import { useAuth } from "../_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { useState } from "react";
import JobApplicationModal from "../components/JobApplicationModal";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  actions: string[];
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "The Real Estate Page (Blocksquare)",
    description: "Tokenizing Agricultural Real-estate for borderless investment and capital liberation",
    category: "Real Estate",
    actions: ["Become an Ambassador", "Tokenize an Asset", "Launch a marketplace", "Join a regional HUB"],
  },
  {
    id: "2",
    title: "Micro Ventures Initiative (MVI DApp)",
    description: "Inspire alphas to propose community projects and launch through MVI Dapp",
    category: "Community Projects",
    actions: ["Propose a Project", "Join a Venture", "Contribute Capital", "Offer Expertise"],
  },
];

const JOB_LISTINGS: JobListing[] = [
  {
    id: "1",
    title: "Smart Contract Developer",
    company: "Libertas Alpha",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "2",
    title: "Community Manager",
    company: "Libertas Alpha",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "3",
    title: "Product Manager",
    company: "Libertas Alpha",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "4",
    title: "Publication Writer",
    company: "Libertas Alpha",
    location: "Remote",
    type: "Seasonal",
  },
];

/**
 * Build Opportunities Page - Projects, ventures, and job listings
 */
export default function Opportunities() {
  const { isAuthenticated } = useAuth();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string } | null>(null);

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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0E0741', color: '#FFFFFF' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#ABABB9' }}>
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/libertas-logo-white.png" alt="Libertas Alpha" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold flex-1">Build Opportunities</h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 text-accent">Explore Jobs and Ecosystem Projects</h2>
            <p style={{ color: '#ABABB9' }}>
              Discover opportunities to contribute your expertise and capital to innovative projects within the Libertas Alpha ecosystem.
            </p>
          </div>

          {/* Projects Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
              <Zap className="w-6 h-6 text-accent" />
              Featured Projects
            </h3>

            <div className="space-y-4">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="border border-border rounded-lg overflow-hidden bg-card/50 hover:bg-card/80 transition"
                >
                  {/* Project Header */}
                  <button
                    onClick={() =>
                      setExpandedProject(
                        expandedProject === project.id ? null : project.id
                      )
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition"
                  >
                    <div className="flex-1 text-left">
                      <h4 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                        {project.title}
                      </h4>
                      <p className="text-sm mt-1" style={{ color: '#ABABB9' }}>
                        {project.description}
                      </p>
                      <span className="inline-block mt-2 px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-medium text-accent">
                        {project.category}
                      </span>
                    </div>
                    {expandedProject === project.id ? (
                      <ChevronUp className="w-5 h-5 text-accent ml-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-accent ml-4 flex-shrink-0" />
                    )}
                  </button>

                  {/* Project Details */}
                  {expandedProject === project.id && (
                    <div className="border-t border-border px-6 py-4 bg-card/30">
                      <h5 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>How to Get Involved</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.actions.map((action, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="border-accent text-accent hover:bg-accent/10 justify-start"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                        <p className="text-sm text-foreground/80">
                          {project.id === "1"
                            ? "Tokenize agricultural real estate and enable borderless investment. Join our network of ambassadors and help democratize real estate investment."
                            : "Propose community-driven projects and launch them through our decentralized platform. Contribute based on your expertise or capital."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Job Listings Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-accent" />
              Libertas Ecosystem Vacancies
            </h3>

            <div className="space-y-3">
              {JOB_LISTINGS.map((job) => (
                <div
                  key={job.id}
                  className="border border-border rounded-lg p-4 bg-card/50 hover:bg-card/80 transition flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{job.title}</h4>
                    <p className="text-sm text-foreground/70 mt-1">
                      {job.company} • {job.location} • {job.type}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedJob({ id: job.id, title: job.title })}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 ml-4"
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-sm" style={{ color: '#FFFFFF' }}>
                More job opportunities are being added regularly. Check back soon or subscribe to our job alerts.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12" style={{ borderColor: '#ABABB9', color: '#ABABB9' }}>
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2025 Libertas Alpha Technologies. All rights reserved.</p>
        </div>
      </footer>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          jobTitle={selectedJob.title}
          jobId={selectedJob.id}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

