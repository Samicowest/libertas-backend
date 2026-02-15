import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Filter, Search, Eye, Trash2, CheckCircle, Clock, XCircle, Star } from "lucide-react";
import { Link } from "wouter";

interface JobApplication {
  id: number;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  cvUrl: string;
  status: "submitted" | "reviewed" | "shortlisted" | "rejected" | "hired";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with real API calls
const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 1,
    jobId: "1",
    jobTitle: "Smart Contract Developer",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    cvUrl: "https://example.com/cv1.pdf",
    status: "shortlisted",
    notes: "Strong Solidity background, excellent portfolio",
    createdAt: "2025-01-10T10:30:00Z",
    updatedAt: "2025-01-12T14:20:00Z",
  },
  {
    id: 2,
    jobId: "4",
    jobTitle: "Publication Writer",
    fullName: "Bob Smith",
    email: "bob@example.com",
    cvUrl: "https://example.com/cv2.pdf",
    status: "submitted",
    notes: null,
    createdAt: "2025-01-11T09:15:00Z",
    updatedAt: "2025-01-11T09:15:00Z",
  },
  {
    id: 3,
    jobId: "2",
    jobTitle: "Community Manager",
    fullName: "Carol Davis",
    email: "carol@example.com",
    cvUrl: "https://example.com/cv3.pdf",
    status: "reviewed",
    notes: "Good community experience, needs more social media metrics",
    createdAt: "2025-01-09T16:45:00Z",
    updatedAt: "2025-01-11T11:30:00Z",
  },
];

export default function JobApplicationsAdmin() {
  const { user, isAuthenticated } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>(MOCK_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterJobTitle, setFilterJobTitle] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Check if user is admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get unique job titles for filtering
  const uniqueJobTitles = Array.from(new Set(applications.map((app) => app.jobTitle)));

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesJobTitle = filterJobTitle === "all" || app.jobTitle === filterJobTitle;
    
    const appDate = new Date(app.createdAt);
    const matchesDateFrom = !filterDateFrom || appDate >= new Date(filterDateFrom);
    const matchesDateTo = !filterDateTo || appDate <= new Date(filterDateTo);

    return matchesSearch && matchesStatus && matchesJobTitle && matchesDateFrom && matchesDateTo;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "reviewed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "shortlisted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "hired":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "reviewed":
        return <Eye className="w-4 h-4" />;
      case "shortlisted":
        return <Star className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "hired":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (appId: number, newStatus: string) => {
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus as any } : app
      )
    );
  };

  const handleAddNote = () => {
    if (selectedApp && noteText.trim()) {
      setApplications(
        applications.map((app) =>
          app.id === selectedApp.id
            ? { ...app, notes: noteText }
            : app
        )
      );
      setNoteText("");
      setShowNoteForm(false);
      setSelectedApp({ ...selectedApp, notes: noteText });
    }
  };

  const handleDeleteApplication = (appId: number) => {
    if (confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((app) => app.id !== appId));
      setSelectedApp(null);
    }
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterJobTitle("all");
    setFilterDateFrom("");
    setFilterDateTo("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: "#0E0741" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-40" style={{ borderColor: "#ABABB9", backgroundColor: "#0E0741" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Job Applications</h1>
          </div>
          <div className="text-sm text-gray-300">
            Total: {filteredApplications.length} applications
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="space-y-4 mb-6 bg-white rounded-lg p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                  style={{ borderColor: "#ABABB9" }}
                />
              </div>

              {/* Advanced Filters */}
              <div className="space-y-3 border-t pt-4">
                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wide mb-2 block">Status Filter</label>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={() => setFilterStatus("all")}
                      variant={filterStatus === "all" ? "default" : "outline"}
                      size="sm"
                      className={filterStatus === "all" ? "bg-purple-600 text-white" : "border-gray-300"}
                    >
                      All
                    </Button>
                    {["submitted", "reviewed", "shortlisted", "rejected", "hired"].map((status) => (
                      <Button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        variant={filterStatus === status ? "default" : "outline"}
                        size="sm"
                        className={filterStatus === status ? "bg-purple-600 text-white" : "border-gray-300"}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wide mb-2 block">Job Title</label>
                  <select
                    value={filterJobTitle}
                    onChange={(e) => setFilterJobTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 bg-white text-black"
                  >
                    <option value="all">All Positions</option>
                    {uniqueJobTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600 uppercase tracking-wide mb-2 block">From Date</label>
                    <input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 uppercase tracking-wide mb-2 block">To Date</label>
                    <input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 bg-white text-black"
                    />
                  </div>
                </div>

                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-3">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-lg">
                  <p>No applications found</p>
                </div>
              ) : (
                filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 rounded-lg border cursor-pointer transition ${
                      selectedApp?.id === app.id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{app.fullName}</h3>
                        <p className="text-sm text-gray-600">{app.jobTitle}</p>
                        <p className="text-xs text-gray-500 mt-1">{app.email}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Application Details */}
          {selectedApp && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Application Details</h3>

                {/* Applicant Info */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Name</p>
                    <p className="font-medium text-gray-900">{selectedApp.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Email</p>
                    <p className="font-medium text-gray-900 break-all">{selectedApp.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Position</p>
                    <p className="font-medium text-gray-900">{selectedApp.jobTitle}</p>
                  </div>
                </div>

                {/* Status Management */}
                <div className="mb-6 pb-6 border-b">
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Status</p>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 text-black bg-white"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="mb-6 pb-6 border-b">
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Notes</p>
                  {selectedApp.notes ? (
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-2">
                      {selectedApp.notes}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No notes yet</p>
                  )}
                  {!showNoteForm ? (
                    <Button
                      onClick={() => setShowNoteForm(true)}
                      variant="outline"
                      size="sm"
                      className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      Add Note
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add internal notes..."
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 text-black"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddNote}
                          size="sm"
                          className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setShowNoteForm(false);
                            setNoteText("");
                          }}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <a
                    href={selectedApp.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download CV
                    </Button>
                  </a>
                  <Button
                    onClick={() => handleDeleteApplication(selectedApp.id)}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
