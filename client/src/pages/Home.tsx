import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Globe, TrendingUp, Users, Zap } from "lucide-react";
import { AIAgentButton } from "@/myAIAgent";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SmartHeader from "@/components/SmartHeader";

/**
 * Landing page for Libertas Alpha
 * Premium design with modern aesthetics
 */
export default function Home() {
  const { isAuthenticated } = useAuth();
  const loginUrl = getLoginUrl();

  const ventures = [
    {
      id: "micro-ventures",
      title: "Micro Ventures Initiative",
      status: "LIVE",
      statusColor: "emerald",
      description: "Empowering grassroots entrepreneurs through blockchain tokenization and community-driven ventures.",
      mediumLink: "https://medium.com/@libertasalpha_10290/introducing-micro-venture-initiative-mvi-tokenizing-sustainable-social-impact-72f9b67069bd",
      icon: Users,
    },
    {
      id: "libertas-estate",
      title: "Libertas Estate",
      status: "COMING SOON",
      statusColor: "amber",
      description: "Real estate tokenization platform enabling asset development and sustainable growth through blockchain technology.",
      mediumLink: "https://medium.com/@libertasalpha_10290/blockchain-technology-in-agricultural-real-estate-a-framework-for-enhanced-liquidity-and-089b6cd04029",
      icon: TrendingUp,
    },
    {
      id: "tradex",
      title: "Tradex",
      status: "COMING SOON",
      statusColor: "amber",
      description: "Trading and commerce platform connecting traders with innovative tools and opportunities for sustainable value creation.",
      mediumLink: "https://medium.com/@libertasalpha_10290/principles-of-the-libertas-trading-division-and-the-path-ahead-95fd7017ae28",
      icon: Globe,
    },
  ];

  const features = [
    { icon: CheckCircle2, title: "Social Impact", description: "Measurable impact aligned with UN SDGs" },
    { icon: TrendingUp, title: "Sustainable Revenue", description: "Reinvested into community growth" },
    { icon: Zap, title: "Decentralized Governance", description: "Transparent multi-sig controls" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0628] via-[#1a0f3d] to-[#0A0628] text-white">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header/Navigation */}
        <SmartHeader />

        {/* Hero Section */}
        <main className="relative">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white/90">Building the Future of Decentralized Value</span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Architecting the Future
                </span>
                <br />
                <span className="text-white">of Value Creation</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                Driving sustainable growth through personnel development, asset development, and cutting-edge technologies
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {isAuthenticated ? (
                  <Button disabled size="lg" className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white/50 border-0 shadow-none px-8 py-6 text-lg cursor-not-allowed">
                    Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 opacity-50" />
                  </Button>
                ) : (
                  null
                )}
                <Link href="/whitepaper">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm" disabled>
                    Read Whitepaper
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">3+</div>
                  <div className="text-sm text-white/60 mt-1">Active Ventures</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">100%</div>
                  <div className="text-sm text-white/60 mt-1">Transparent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">∞</div>
                  <div className="text-sm text-white/60 mt-1">Possibilities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, idx) => (
                <div key={idx} className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
                  <feature.icon className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ventures Section */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Ventures</span>
              </h2>
              <p className="text-white/60 text-lg">Explore the ecosystem of opportunities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {ventures.map((venture) => (
                <div key={venture.id} className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 rounded-2xl transition-all"></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <venture.icon className="w-10 h-10 text-purple-400" />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${venture.statusColor === 'emerald'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                        }`}>
                        {venture.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{venture.title}</h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed">{venture.description}</p>

                    <a
                      href={venture.mediumLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium text-sm group/link"
                    >
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Involved?</h3>
              <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
                Join our ventures and become part of a movement that's creating real-world impact through innovation and decentralized systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button disabled size="lg" className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white/50 border-0 shadow-none px-8 cursor-not-allowed">
                  Explore Opportunities
                </Button>
                <Link href="/support">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-white/10 backdrop-blur-sm bg-black/20 py-12">
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
    </>
  );
}
