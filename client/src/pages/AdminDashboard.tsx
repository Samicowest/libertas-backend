import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, Edit2, Trash2, Eye, EyeOff, BarChart3, Users, FileText, Settings } from "lucide-react";
import { useState } from "react";

/**
 * Admin Dashboard - Content management and analytics
 * Only accessible to admin users
 */
export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"projects" | "users" | "analytics" | "settings">("projects");

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground mb-4">You do not have access to the admin dashboard.</p>
          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Return Home
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
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/libertas-logo-dark.png" alt="Libertas Alpha" className="h-12 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold flex-1 ml-8">Admin Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              Back to Site
            </Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-7xl">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b" style={{ borderColor: '#ABABB9' }}>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition ${activeTab === "projects"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
            >
              <FileText className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition ${activeTab === "users"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
            >
              <Users className="w-4 h-4" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition ${activeTab === "analytics"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition ${activeTab === "settings"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Project Management</h2>
                <Link href="/admin/projects/new">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Project
                  </Button>
                </Link>
              </div>

              {/* Projects Table */}
              <div className="border rounded-lg" style={{ borderColor: '#ABABB9' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderColor: '#ABABB9', backgroundColor: '#1a0f4d' }}>
                      <th className="px-6 py-4 text-left font-semibold">Title</th>
                      <th className="px-6 py-4 text-left font-semibold">Venture</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Views</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample Project Row */}
                    <tr style={{ borderColor: '#ABABB9' }} className="border-t">
                      <td className="px-6 py-4">Libertas Water Project</td>
                      <td className="px-6 py-4">Micro Ventures Initiative</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 text-xs font-medium rounded-full">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4">1,250</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-accent/20 rounded transition">
                            <Eye className="w-4 h-4 text-accent" />
                          </button>
                          <button className="p-2 hover:bg-accent/20 rounded transition">
                            <Edit2 className="w-4 h-4 text-accent" />
                          </button>
                          <button className="p-2 hover:bg-red-500/20 rounded transition">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Total Projects</h3>
                  <p className="text-3xl font-bold text-accent">1</p>
                </div>
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Published</h3>
                  <p className="text-3xl font-bold text-green-400">1</p>
                </div>
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Total Views</h3>
                  <p className="text-3xl font-bold text-accent">1,250</p>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">User Management</h2>
              <div className="border rounded-lg" style={{ borderColor: '#ABABB9' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderColor: '#ABABB9', backgroundColor: '#1a0f4d' }}>
                      <th className="px-6 py-4 text-left font-semibold">Name</th>
                      <th className="px-6 py-4 text-left font-semibold">Email</th>
                      <th className="px-6 py-4 text-left font-semibold">Role</th>
                      <th className="px-6 py-4 text-left font-semibold">Joined</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderColor: '#ABABB9' }} className="border-t">
                      <td className="px-6 py-4">{user?.username || "Admin"}</td>
                      <td className="px-6 py-4">{user?.email || "admin@libertas.com"}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-accent/20 border border-accent text-accent text-xs font-medium rounded-full">
                          Admin
                        </span>
                      </td>
                      <td className="px-6 py-4">2025-01-01</td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-accent/20 rounded transition">
                          <Edit2 className="w-4 h-4 text-accent" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Analytics & Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Total Visitors</h3>
                  <p className="text-3xl font-bold text-accent">5,240</p>
                  <p className="text-xs text-foreground/50 mt-2">+12% from last month</p>
                </div>
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Active Users</h3>
                  <p className="text-3xl font-bold text-accent">342</p>
                  <p className="text-xs text-foreground/50 mt-2">Currently online</p>
                </div>
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Avg. Session</h3>
                  <p className="text-3xl font-bold text-accent">4m 32s</p>
                  <p className="text-xs text-foreground/50 mt-2">Per user</p>
                </div>
                <div className="border rounded-lg p-6" style={{ borderColor: '#ABABB9' }}>
                  <h3 className="text-sm font-medium text-foreground/70 mb-2">Bounce Rate</h3>
                  <p className="text-3xl font-bold text-accent">32%</p>
                  <p className="text-xs text-foreground/50 mt-2">-5% improvement</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Site Settings</h2>
              <div className="border rounded-lg p-8" style={{ borderColor: '#ABABB9' }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Title</label>
                    <input
                      type="text"
                      defaultValue="Libertas Alpha"
                      className="w-full px-4 py-2 rounded bg-card border"
                      style={{ borderColor: '#ABABB9' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Description</label>
                    <textarea
                      defaultValue="Architecting the Future of Value"
                      className="w-full px-4 py-2 rounded bg-card border"
                      style={{ borderColor: '#ABABB9' }}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="admin@libertasalpha.com"
                      className="w-full px-4 py-2 rounded bg-card border"
                      style={{ borderColor: '#ABABB9' }}
                    />
                  </div>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          )}
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

