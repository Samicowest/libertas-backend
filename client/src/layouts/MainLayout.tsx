/**
 * REQUIREMENT: Professional UI/UX Layout
 * DESCRIPTION: A responsive main layout with navigation, sidebar, and consistent spacing.
 */

import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Briefcase,
  LogOut,
  Menu,
  X,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIAgentButton } from '@/myAIAgent';

interface MainLayoutProps {
  children: React.ReactNode;
}

import { useAuth } from "@/_core/hooks/useAuth";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { logout } = useAuth();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/certify', label: 'Certify', icon: GraduationCap },
    { href: '/affiliate', label: 'Affiliate', icon: Users },
    { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
    { href: '/whitepaper', label: 'Whitepaper', icon: FileText },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="p-6">
          <Link href="/">
            <img src="/libertas-logo.png" alt="Libertas" className="h-8 cursor-pointer" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                location === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-card">
          <img src="/libertas-logo.png" alt="Libertas" className="h-6" />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background pt-20 px-6">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className="flex items-center gap-4 text-xl py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.label}
                  </a>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-xl py-2 px-0 text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="w-6 h-6" />
                Logout
              </Button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
