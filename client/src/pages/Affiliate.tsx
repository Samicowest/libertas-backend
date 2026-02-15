import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Handshake, CheckCircle } from "lucide-react";
import { useState } from "react";

/**
 * Affiliate Page - Affiliate program applications and management
 */
export default function Affiliate() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    website: "",
    followAGDProgram: false,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send form data to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        companyName: "",
        email: "",
        website: "",
        followAGDProgram: false,
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0E0741', color: '#FFFFFF' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#ABABB9' }}>
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/libertas-logo-white.png" alt="Libertas Alpha" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold flex-1">Affiliate Program</h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-accent">Become an Affiliate</h2>
            <p style={{ color: '#ABABB9' }}>
              Join the Libertas Alpha Affiliate Program and earn commissions by promoting our products and services.
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-accent">Application Submitted!</p>
                <p className="text-sm" style={{ color: '#ABABB9' }}>
                  We will review your application and contact you within 48 hours.
                </p>
              </div>
            </div>
          )}

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 p-6 rounded-lg border border-border">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#FFFFFF' }}>Company / Business Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="Your company name"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#FFFFFF' }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-2">Website / Social Media</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">Tell us about your audience</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Describe your audience, reach, and why you'd be a great fit..."
                rows={4}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* AGD Program Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
              <input
                type="checkbox"
                id="agdProgram"
                checked={formData.followAGDProgram}
                onChange={(e) =>
                  setFormData({ ...formData, followAGDProgram: e.target.checked })
                }
                className="w-5 h-5 mt-0.5 accent-accent cursor-pointer"
              />
              <label htmlFor="agdProgram" className="cursor-pointer flex-1">
                <p className="font-medium text-foreground">
                  Follow the AGD Affiliate Program
                </p>
                <p className="text-sm text-foreground/70 mt-1">
                  Join our advanced training program to get a dedicated mentor and access exclusive resources.
                </p>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-lg"
            >
              Submit Application
            </Button>
          </form>

          {/* Benefits Section */}
          <div className="mt-12 p-6 bg-card/50 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-accent" />
              Affiliate Benefits
            </h3>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Competitive commission rates on all referred sales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Marketing materials and promotional support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Dedicated affiliate manager for your account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Real-time tracking and reporting dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Access to exclusive training and resources</span>
              </li>
            </ul>
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

