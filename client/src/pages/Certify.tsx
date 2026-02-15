import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Award, ChevronDown, ChevronUp, BookOpen, Clock, CheckCircle, Play } from "lucide-react";
import { useState } from "react";
import NFTMintingModal from "@/components/NFTMintingModal";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "quiz" | "exercise";
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completionPercentage: number;
}

interface TrainingTrack {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  modules: Module[];
  progress: number;
  evaluationScore: number;
  isCompleted: boolean;
  skills: string[];
  smeContacts?: { name: string; expertise: string; socialLinks: { platform: string; url: string }[] }[];
}

const TRAINING_TRACKS: TrainingTrack[] = [
  {
    id: "1",
    name: "Trading Analysis",
    description: "Master technical and fundamental analysis for crypto trading",
    duration: "12 weeks",
    level: "Intermediate",
    progress: 75,
    evaluationScore: 78,
    isCompleted: false,
    skills: ["Technical Analysis", "Risk Management", "Market Psychology", "Trading Strategies"],
    smeContacts: [
      { name: "Alex Chen", expertise: "Technical Analysis", socialLinks: [{ platform: "Twitter", url: "https://twitter.com/alexchen" }, { platform: "LinkedIn", url: "https://linkedin.com/in/alexchen" }] },
    ],
    modules: [
      {
        id: "m1",
        title: "Fundamentals of Trading",
        completionPercentage: 100,
        lessons: [
          { id: "l1", title: "Introduction to Trading Markets", duration: "45 min", completed: true, type: "video" },
          { id: "l2", title: "Understanding Market Structures", duration: "60 min", completed: true, type: "video" },
          { id: "l3", title: "Trading Basics Quiz", duration: "15 min", completed: true, type: "quiz" },
        ],
      },
      {
        id: "m2",
        title: "Technical Analysis Mastery",
        completionPercentage: 75,
        lessons: [
          { id: "l4", title: "Chart Patterns & Trends", duration: "90 min", completed: true, type: "video" },
          { id: "l5", title: "Indicators Deep Dive", duration: "120 min", completed: true, type: "video" },
          { id: "l6", title: "Technical Analysis Exercise", duration: "45 min", completed: false, type: "exercise" },
          { id: "l7", title: "Technical Analysis Assessment", duration: "30 min", completed: false, type: "quiz" },
        ],
      },
      {
        id: "m3",
        title: "Risk Management & Psychology",
        completionPercentage: 50,
        lessons: [
          { id: "l8", title: "Position Sizing & Stop Loss", duration: "60 min", completed: true, type: "video" },
          { id: "l9", title: "Trading Psychology", duration: "75 min", completed: false, type: "video" },
          { id: "l10", title: "Risk Management Case Studies", duration: "45 min", completed: false, type: "exercise" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Project Management",
    description: "Learn to manage complex projects and teams effectively",
    duration: "10 weeks",
    level: "Intermediate",
    progress: 45,
    evaluationScore: 0,
    isCompleted: false,
    skills: ["Project Planning", "Team Leadership", "Agile Methodology", "Stakeholder Management"],
    smeContacts: [
      { name: "Sarah Johnson", expertise: "Project Management", socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com/in/sarahjohnson" }] },
    ],
    modules: [
      {
        id: "m4",
        title: "Project Management Fundamentals",
        completionPercentage: 100,
        lessons: [
          { id: "l11", title: "Introduction to Project Management", duration: "50 min", completed: true, type: "video" },
          { id: "l12", title: "Project Lifecycle Overview", duration: "60 min", completed: true, type: "video" },
          { id: "l13", title: "PM Fundamentals Quiz", duration: "20 min", completed: true, type: "quiz" },
        ],
      },
      {
        id: "m5",
        title: "Planning & Execution",
        completionPercentage: 50,
        lessons: [
          { id: "l14", title: "Scope Definition & Planning", duration: "90 min", completed: true, type: "video" },
          { id: "l15", title: "Resource Allocation", duration: "75 min", completed: false, type: "video" },
          { id: "l16", title: "Planning Exercise", duration: "60 min", completed: false, type: "exercise" },
        ],
      },
      {
        id: "m6",
        title: "Team Leadership & Communication",
        completionPercentage: 0,
        lessons: [
          { id: "l17", title: "Leading High-Performance Teams", duration: "90 min", completed: false, type: "video" },
          { id: "l18", title: "Stakeholder Communication", duration: "75 min", completed: false, type: "video" },
          { id: "l19", title: "Leadership Case Studies", duration: "45 min", completed: false, type: "exercise" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Smart Contract Development",
    description: "Build secure and efficient smart contracts on blockchain",
    duration: "14 weeks",
    level: "Advanced",
    progress: 60,
    evaluationScore: 72,
    isCompleted: false,
    skills: ["Solidity", "Smart Contract Security", "DeFi Protocols", "Testing & Deployment"],
    smeContacts: [
      { name: "Marcus Lee", expertise: "Smart Contract Security", socialLinks: [{ platform: "GitHub", url: "https://github.com/marcuslee" }, { platform: "Twitter", url: "https://twitter.com/marcuslee" }] },
    ],
    modules: [
      {
        id: "m7",
        title: "Blockchain & Solidity Basics",
        completionPercentage: 100,
        lessons: [
          { id: "l20", title: "Blockchain Fundamentals", duration: "75 min", completed: true, type: "video" },
          { id: "l21", title: "Introduction to Solidity", duration: "90 min", completed: true, type: "video" },
          { id: "l22", title: "Solidity Basics Quiz", duration: "25 min", completed: true, type: "quiz" },
        ],
      },
      {
        id: "m8",
        title: "Smart Contract Development",
        completionPercentage: 75,
        lessons: [
          { id: "l23", title: "Writing Your First Smart Contract", duration: "120 min", completed: true, type: "video" },
          { id: "l24", title: "Advanced Solidity Patterns", duration: "150 min", completed: true, type: "video" },
          { id: "l25", title: "Smart Contract Development Lab", duration: "180 min", completed: false, type: "exercise" },
        ],
      },
      {
        id: "m9",
        title: "Security & Best Practices",
        completionPercentage: 25,
        lessons: [
          { id: "l26", title: "Smart Contract Security", duration: "120 min", completed: true, type: "video" },
          { id: "l27", title: "Auditing & Testing", duration: "90 min", completed: false, type: "video" },
          { id: "l28", title: "Security Assessment Exercise", duration: "120 min", completed: false, type: "exercise" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Affiliate Servicing",
    description: "Become an expert in affiliate marketing and partnership management",
    duration: "8 weeks",
    level: "Beginner",
    progress: 100,
    evaluationScore: 85,
    isCompleted: true,
    skills: ["Affiliate Marketing", "Partnership Management", "Commission Structures", "Performance Tracking"],
    smeContacts: [
      { name: "Emma Rodriguez", expertise: "Affiliate Marketing", socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com/in/emmarodriguez" }] },
    ],
    modules: [
      {
        id: "m10",
        title: "Affiliate Marketing Fundamentals",
        completionPercentage: 100,
        lessons: [
          { id: "l29", title: "Introduction to Affiliate Marketing", duration: "45 min", completed: true, type: "video" },
          { id: "l30", title: "Affiliate Program Models", duration: "60 min", completed: true, type: "video" },
          { id: "l31", title: "Affiliate Basics Quiz", duration: "15 min", completed: true, type: "quiz" },
        ],
      },
      {
        id: "m11",
        title: "Building Successful Partnerships",
        completionPercentage: 100,
        lessons: [
          { id: "l32", title: "Recruiting & Onboarding Affiliates", duration: "75 min", completed: true, type: "video" },
          { id: "l33", title: "Commission Structures & Incentives", duration: "60 min", completed: true, type: "video" },
          { id: "l34", title: "Partnership Management Exercise", duration: "45 min", completed: true, type: "exercise" },
        ],
      },
      {
        id: "m12",
        title: "Performance & Analytics",
        completionPercentage: 100,
        lessons: [
          { id: "l35", title: "Tracking & Reporting", duration: "60 min", completed: true, type: "video" },
          { id: "l36", title: "Performance Optimization", duration: "75 min", completed: true, type: "video" },
          { id: "l37", title: "Final Assessment", duration: "30 min", completed: true, type: "quiz" },
        ],
      },
    ],
  },
];

/**
 * Certify Page - Training tracks with detailed curriculum and NFT minting
 */
export default function Certify() {
  const { isAuthenticated } = useAuth();
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [selectedTrackForNFT, setSelectedTrackForNFT] = useState<TrainingTrack | null>(null);

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
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/libertas-logo-white.png" alt="Libertas Alpha" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-white ml-auto">Certify - Training Tracks</h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Professional Certification Tracks</h2>
          <p className="text-gray-300 text-lg">Learn from industry experts through our curated curriculum. Subject matter specialists provide content and mentorship via social media. Complete the curriculum and achieve 70%+ on evaluations to mint your Soul Bound NFT Certificate.</p>
        </div>

        {/* Training Tracks */}
        <div className="space-y-6">
          {TRAINING_TRACKS.map((track) => (
            <div
              key={track.id}
              className="border rounded-lg p-6 transition-all"
              style={{ borderColor: '#ABABB9', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              {/* Track Header */}
              <div
                className="cursor-pointer"
                onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{track.name}</h3>
                    <p className="text-gray-300 mb-4">{track.description}</p>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={16} /> {track.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} /> {track.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award size={16} /> {track.modules.length} Modules
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4 ml-6">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-accent">{track.progress}%</div>
                      <div className="text-sm text-gray-400">Complete</div>
                    </div>
                    {expandedTrack === track.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${track.progress}%` }}
                  ></div>
                </div>

                {/* Status & Evaluation Score */}
                <div className="flex gap-4">
                  {track.evaluationScore > 0 && (
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-semibold rounded-full">
                      📊 Evaluation Score: {track.evaluationScore}%
                    </span>
                  )}
                  {track.isCompleted && (
                    <span className="px-3 py-1 bg-accent/20 border border-accent text-accent text-xs font-semibold rounded-full">
                      ✓ Completed - NFT Minted
                    </span>
                  )}
                  {track.evaluationScore >= 70 && !track.isCompleted && (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 text-xs font-semibold rounded-full">
                      🎯 Ready to Mint NFT
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded Content - Modules & Lessons */}
              {expandedTrack === track.id && (
                <div className="mt-8 pt-8 border-t" style={{ borderColor: '#ABABB9' }}>
                  {/* SME Contacts */}
                  {track.smeContacts && track.smeContacts.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-3">Subject Matter Experts</h4>
                      <div className="space-y-3">
                        {track.smeContacts.map((sme, idx) => (
                          <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(130, 54, 253, 0.1)', borderColor: '#8236FD', borderWidth: '1px' }}>
                            <p className="font-semibold text-white mb-1">{sme.name}</p>
                            <p className="text-sm text-gray-400 mb-2">{sme.expertise}</p>
                            <div className="flex gap-2">
                              {sme.socialLinks.map((link, linkIdx) => (
                                <a
                                  key={linkIdx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 text-sm font-semibold"
                                >
                                  {link.platform} →
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Skills You'll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {track.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: 'rgba(130, 54, 253, 0.2)', color: '#8236FD' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modules */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Course Modules</h4>
                    <div className="space-y-4">
                      {track.modules.map((module) => (
                        <div
                          key={module.id}
                          className="border rounded-lg p-4 transition-all"
                          style={{ borderColor: '#ABABB9', backgroundColor: 'rgba(255,255,255,0.01)' }}
                        >
                          <div
                            className="cursor-pointer flex items-center justify-between"
                            onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                          >
                            <div className="flex-1">
                              <h5 className="text-lg font-semibold mb-2">{module.title}</h5>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="flex-1 bg-gray-700 rounded-full h-1.5 max-w-xs">
                                  <div
                                    className="bg-accent h-1.5 rounded-full"
                                    style={{ width: `${module.completionPercentage}%` }}
                                  ></div>
                                </div>
                                <span>{module.completionPercentage}%</span>
                              </div>
                            </div>
                            {expandedModule === module.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </div>

                          {/* Lessons */}
                          {expandedModule === module.id && (
                            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#ABABB9' }}>
                              <div className="space-y-3">
                                {module.lessons.map((lesson) => (
                                  <div key={lesson.id} className="flex items-center gap-3 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                    {lesson.completed ? (
                                      <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                                    ) : (
                                      <Play size={20} className="text-gray-500 flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                      <p className={lesson.completed ? 'text-gray-400 line-through' : 'text-white'}>{lesson.title}</p>
                                      <p className="text-xs text-gray-500">{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} • {lesson.duration}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex gap-4">
                    <Button 
                      className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        if (track.evaluationScore >= 70) {
                          setSelectedTrackForNFT(track);
                          setShowNFTModal(true);
                        }
                      }}
                      disabled={track.evaluationScore < 70 && !track.isCompleted}
                    >
                      {track.isCompleted ? 'NFT Minted ✓' : track.evaluationScore >= 70 ? 'Mint NFT Certificate' : 'Continue Learning'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12" style={{ borderColor: '#ABABB9' }}>
        <div className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Libertas Alpha Technologies. All rights reserved.</p>
        </div>
      </footer>

      {/* NFT Minting Modal */}
      {selectedTrackForNFT && (
        <NFTMintingModal
          isOpen={showNFTModal}
          trackName={selectedTrackForNFT.name}
          evaluationScore={selectedTrackForNFT.evaluationScore}
          onClose={() => setShowNFTModal(false)}
          onMint={async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }}
        />
      )}
    </div>
  );
}
