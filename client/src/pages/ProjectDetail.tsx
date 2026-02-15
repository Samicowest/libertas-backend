import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowLeft, Sparkles } from "lucide-react";
import SmartHeader from "@/components/SmartHeader";

/**
 * Project Detail Page - Full blog story about a specific project
 */
export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:slug");

  // Mock project data - In production, this would fetch from the API
  const project = {
    id: 1,
    title: "Libertas Water Project",
    slug: "libertas-water-project",
    description: "Bringing clean water access to underserved communities through the Micro Ventures Initiative",
    venture: "Micro Ventures Initiative",
    featuredImage: "https://via.placeholder.com/800x400?text=Water+Project",
    tags: "water,sustainability,community",
    viewCount: 1250,
    publishedAt: new Date("2025-01-15"),
    author: "Libertas Team",
    content: `
      <h2>Project Overview</h2>
      <p>The Libertas Water Project represents a groundbreaking initiative under the Micro Ventures Initiative to address water scarcity in underserved communities. Through innovative blockchain tokenization and community-driven approaches, we've created a sustainable model for clean water access.</p>

      <h2>The Challenge</h2>
      <p>Many communities across Nigeria and Africa face critical challenges in accessing clean, safe water. Traditional approaches to water infrastructure have proven inefficient and unsustainable. The Libertas Water Project was designed to tackle this challenge through a decentralized, community-centric approach.</p>

      <h2>Our Solution</h2>
      <p>We implemented a three-pronged strategy:</p>
      <ul>
        <li><strong>Infrastructure Development:</strong> Installing water purification systems powered by renewable energy</li>
        <li><strong>Community Ownership:</strong> Using blockchain tokens to give communities stake in the project</li>
        <li><strong>Sustainable Revenue:</strong> Creating revenue streams that fund maintenance and expansion</li>
      </ul>

      <h2>Impact Achieved</h2>
      <p>Since launch, the Libertas Water Project has:</p>
      <ul>
        <li>Provided clean water access to 5,000+ community members</li>
        <li>Created 50+ local jobs in water system maintenance</li>
        <li>Reduced waterborne diseases by 40% in participating communities</li>
        <li>Generated sustainable revenue for ongoing operations</li>
      </ul>

      <h2>Community Testimonials</h2>
      <p>"The Libertas Water Project has transformed our community. Clean water access has improved health outcomes and freed up time for children to attend school." - Community Leader</p>

      <h2>Looking Forward</h2>
      <p>The success of the Libertas Water Project demonstrates the power of combining technology, community involvement, and sustainable business models. We're now scaling this approach to additional communities and exploring similar models for other essential services.</p>

      <h2>Get Involved</h2>
      <p>Interested in supporting the Libertas Water Project or similar initiatives? There are several ways to contribute:</p>
      <ul>
        <li>Become a community ambassador</li>
        <li>Invest in water project tokens</li>
        <li>Volunteer technical expertise</li>
        <li>Partner with us on expansion</li>
      </ul>
    `,
  };

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground/70 mb-4">Project not found</p>
          <Link href="/projects">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0628] via-[#1a0f3d] to-[#0A0628] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <SmartHeader />

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          {/* Back Button */}
          <Link href="/projects">
            <Button variant="ghost" className="mb-8 text-purple-400 hover:text-purple-300 hover:bg-white/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>

          {/* Featured Image */}
          {project.featuredImage && (
            <img
              src={project.featuredImage}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* Title and Meta */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-medium text-purple-400">
                {project.venture}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">{project.description}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm text-white/60 border-t border-b border-white/10 py-6">
              {project.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.publishedAt).toLocaleDateString()}</span>
                </div>
              )}
              {project.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{project.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{project.viewCount} views</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-purple max-w-none mb-16">
            <div
              className="text-white/80 leading-relaxed space-y-8 text-lg font-light"
              dangerouslySetInnerHTML={{
                __html: project.content
                  .split("\n")
                  .map((line) => line.trim())
                  .filter((line) => line)
                  .join("\n"),
              }}
            />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-sm rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Support This Initiative</h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Help us expand the impact of projects like the Libertas Water Project. Join our community of changemakers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/50 px-8">
                  Get Involved
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-sm bg-black/20 py-12 mt-12">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          <p>&copy; 2025 Libertas Alpha Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

