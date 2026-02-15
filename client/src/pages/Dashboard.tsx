/**
 * REQUIREMENT: Modern Dashboard UI
 * DESCRIPTION: A sectioned dashboard showing user stats, recent activity, and quick actions.
 */

import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

import { useAuth } from "@/_core/hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, loading: userLoading } = useAuth({ redirectOnUnauthenticated: true });

  // Mock tracks data
  const tracks = [
    { id: 1, name: "Blockchain Fundamentals", description: "Learn the basics of decentralized technology.", level: "Beginner" },
    { id: 2, name: "Sustainable Development", description: "Exploring UN SDGs and social impact.", level: "Intermediate" }
  ];
  const tracksLoading = false;

  if (userLoading || tracksLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* SECTION: Welcome Header */}
        <section>
          <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user?.username || 'Explorer'}!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your certifications today.</p>
        </section>

        {/* SECTION: Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Tracks</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Top 10% of learners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5h</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </section>

        {/* SECTION: Recommended Tracks */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recommended for You</h2>
            <Link href="/certify">
              <Button variant="link" className="gap-2">
                View all <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks?.slice(0, 2).map((track: any) => (
              <Card key={track.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-3 bg-primary" />
                <CardHeader>
                  <CardTitle>{track.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {track.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-1 bg-accent rounded-full">
                      {track.level}
                    </span>
                    <Link href={`/certify?track=${track.id}`}>
                      <Button size="sm">Continue Learning</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
