import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Zap, TrendingUp, Briefcase } from "lucide-react";

interface Venture {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const VENTURES_DATA: Venture[] = [
  {
    id: "micro-ventures",
    title: "Micro Ventures Initiative",
    category: "Systems",
    description: "Specialists in Micro Systems for social impact and sustainable revenue through Tokenization.",
    icon: <Zap className="w-8 h-8" />,
    details: [
      "Community-driven micro-entrepreneurship",
      "Blockchain-based tokenization for asset creation",
      "Sustainable revenue models for grassroots ventures",
      "Social impact measurement and tracking",
      "Capital liberation through decentralized platforms",
    ],
  },
  {
    id: "libertas-estate",
    title: "Libertas Estate",
    category: "Real Estate",
    description: "Tokenizing Agricultural Real-estate for borderless investment and capital liberation without Land ownership complexities.",
    icon: <Briefcase className="w-8 h-8" />,
    details: [
      "Agricultural real estate tokenization",
      "Borderless investment opportunities",
      "Fractionalized ownership models",
      "Simplified land access without ownership complexities",
      "Global capital access for local assets",
      "Compliance-ready RWA framework",
    ],
  },
  {
    id: "tradex",
    title: "Tradex",
    category: "Trading",
    description: "Decentralized signal execution consensus for analysts and Libertas Alpha partners: bridging Liquidity and expertise.",
    icon: <TrendingUp className="w-8 h-8" />,
    details: [
      "Decentralized trading signal execution",
      "Consensus-based decision making",
      "Analyst expertise aggregation",
      "Liquidity bridging mechanisms",
      "Partner collaboration platform",
      "Risk management through collective intelligence",
    ],
  },
];

/**
 * Ventures Page - Showcase of Libertas Alpha ventures
 */
export default function Ventures() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/libertas-logo.png" alt="Libertas Alpha" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold flex-1">Ventures</h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-accent mb-4">Explore Our Ventures</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Discover our innovative ventures and partnerships that are driving sustainable development and social impact across multiple sectors.
            </p>
          </div>

          {/* Ventures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {VENTURES_DATA.map((venture) => (
              <div
                key={venture.id}
                className="border border-border rounded-lg overflow-hidden bg-card/50 hover:bg-card/80 transition flex flex-col"
              >
                {/* Venture Header */}
                <div className="p-6 border-b border-border bg-card/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent">
                      {venture.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{venture.title}</h3>
                      <p className="text-sm text-accent font-medium">{venture.category}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80">{venture.description}</p>
                </div>

                {/* Venture Details */}
                <div className="p-6 flex-1">
                  <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {venture.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/80">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Venture Footer */}
                <div className="p-6 border-t border-border bg-card/30">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Ventures Overview Section */}
          <section className="border border-border rounded-lg p-8 bg-card/50 mb-12">
            <h3 className="text-2xl font-bold text-accent mb-6">Why Our Ventures Matter</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-foreground mb-3">Social Impact</h4>
                <p className="text-foreground/80">
                  Each venture is designed with measurable social impact at its core, aligned with UN Sustainable Development Goals.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3">Sustainable Revenue</h4>
                <p className="text-foreground/80">
                  Our ventures generate sustainable revenue streams that are reinvested into community development and ecosystem growth.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-3">Decentralized Governance</h4>
                <p className="text-foreground/80">
                  All ventures operate under non-profit governance with transparent, multi-signature treasury controls.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="border border-accent/30 rounded-lg p-8 bg-accent/5 text-center">
            <h3 className="text-2xl font-bold text-accent mb-4">Ready to Get Involved?</h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Join our ventures and become part of a movement that's creating real-world impact through innovation and decentralized systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Explore Opportunities
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-foreground/70 text-sm">
          <p>&copy; 2025 Libertas Alpha Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

