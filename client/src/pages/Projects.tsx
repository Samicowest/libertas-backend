import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, ArrowRight, Sparkles, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import SmartHeader from "@/components/SmartHeader";

interface ProjectStory {
  id: number;
  title: string;
  slug: string;
  description: string;
  venture: string;
  featuredImage?: string;
  tags?: string;
  viewCount: number;
  publishedAt?: Date;
  author?: string;
}

/**
 * Projects Page - Blog stories about Libertas Alpha initiatives
 * Premium design matching Home page aesthetics
 */
export default function Projects() {
  const [projects, setProjects] = useState<ProjectStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenture, setSelectedVenture] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - In production, this would fetch from the API
    const mockProjects: ProjectStory[] = [
      {
        id: 1,
        title: "Libertas Water Project",
        slug: "libertas-water-project",
        description: "Bringing clean water access to underserved communities through the Micro Ventures Initiative",
        venture: "Micro Ventures Initiative",
        featuredImage: "/libertas_microventure.png",
        tags: "water,sustainability,community",
        viewCount: 1250,
        publishedAt: new Date("2025-01-15"),
        author: "Libertas Team",
      },
      {
        id: 2,
        title: "Agricultural Tokenization Pilot",
        slug: "agricultural-tokenization-pilot",
        description: "Pioneering blockchain-based real estate tokenization for sustainable agricultural development",
        venture: "Libertas Estate",
        featuredImage: "/libertas_estate.png",
        tags: "blockchain,agriculture,tokenization",
        viewCount: 890,
        publishedAt: new Date("2025-01-10"),
        author: "Libertas Team",
      },
      {
        id: 3,
        title: "Community Trading Platform Launch",
        slug: "community-trading-platform",
        description: "Empowering local traders with innovative tools and sustainable value creation opportunities",
        venture: "Tradex",
        featuredImage: "/libertas_tradex.png",
        tags: "trading,commerce,platform",
        viewCount: 1520,
        publishedAt: new Date("2025-01-05"),
        author: "Libertas Team",
      },
    ];
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  const ventures = ["Micro Ventures Initiative", "Libertas Estate", "Tradex"];
  const filteredProjects = selectedVenture
    ? projects.filter((p) => p.venture === selectedVenture)
    : projects;

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
      <main className="relative flex-1 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <section className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white/90">Impact Stories & Initiatives</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Project Stories
              </span>
            </h1>

            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Discover the impact stories and initiatives carried out by Libertas Alpha across our ventures.
              Learn how we're creating sustainable value and empowering communities.
            </p>
          </section>

          {/* Venture Filter */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Filter by Venture</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setSelectedVenture(null)}
                className={`transition-all ${selectedVenture === null
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg shadow-purple-500/50"
                  : "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-sm"
                  }`}
              >
                All Projects
              </Button>
              {ventures.map((venture) => (
                <Button
                  key={venture}
                  onClick={() => setSelectedVenture(venture)}
                  className={`transition-all ${selectedVenture === venture
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg shadow-purple-500/50"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-sm"
                    }`}
                >
                  {venture}
                </Button>
              ))}
            </div>
          </section>

          {/* Projects Grid */}
          <section>
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white/70">Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-white/70 text-lg">No projects found for this venture.</p>
                <p className="text-white/50 text-sm mt-2">Try selecting a different filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.slug}`}>
                    <div className="group relative h-full rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all hover:scale-105 overflow-hidden cursor-pointer">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all"></div>

                      {/* Featured Image */}
                      {project.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.featuredImage}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0628] via-transparent to-transparent"></div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative p-6 flex flex-col">
                        {/* Venture Tag */}
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs font-semibold text-purple-400">
                            {project.venture}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 mb-4 text-sm leading-relaxed flex-1">
                          {project.description}
                        </p>

                        {/* Meta Information */}
                        <div className="space-y-2 mb-4 text-xs text-white/60">
                          {project.publishedAt && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(project.publishedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                          {project.author && (
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5" />
                              <span>{project.author}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{project.viewCount.toLocaleString()} views</span>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-purple-400 font-medium text-sm group/link">
                          Read Full Story
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* CTA Section */}
          {!loading && filteredProjects.length > 0 && (
            <section className="mt-20">
              <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-4">Want to Contribute?</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  Join our community and help us create more impactful projects that drive sustainable change.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl shadow-purple-500/50 px-8">
                      Get Involved
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 backdrop-blur-sm bg-black/20 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/libertas-logo-white.png" alt="Libertas Alpha" className="h-8 w-auto" />
              <span className="text-sm text-white/60">© 2026 Libertas Alpha Technologies</span>
            </div>
            <div className="flex gap-6">
              <Link href="/whitepaper" className="text-white/60 hover:text-white transition-colors text-sm">
                Whitepaper
              </Link>
              <Link href="/projects" className="text-white/60 hover:text-white transition-colors text-sm">
                Projects
              </Link>
              <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                About
              </Link>
              <Link href="/support" className="text-white/60 hover:text-white transition-colors text-sm">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
