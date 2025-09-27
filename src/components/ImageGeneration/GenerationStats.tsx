import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Zap, Clock, CheckCircle } from "lucide-react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { useAuth } from "@/hooks/useAuth";

export const GenerationStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalGenerations: 0,
    completedGenerations: 0,
    totalImages: 0,
    averageTime: 0,
    recentActivity: [] as any[]
  });
  const [loading, setLoading] = useState(true);
  const { getUserHistory } = useImageGeneration();
  const { user } = useAuth();

  useEffect(() => {
    const calculateStats = async () => {
      if (user) {
        const history = await getUserHistory();
        
        if (history && history.length > 0) {
          const totalGenerations = history.length;
          const completedGenerations = history.filter(h => h.status === 'completed').length;
          const totalImages = history.reduce((sum, h) => sum + (h.generated_images?.length || 0), 0);
          const completedItems = history.filter(h => h.processing_time_seconds);
          const averageTime = completedItems.length > 0 
            ? completedItems.reduce((sum, h) => sum + h.processing_time_seconds, 0) / completedItems.length
            : 0;

          setStats({
            totalGenerations,
            completedGenerations,
            totalImages,
            averageTime: Math.round(averageTime * 10) / 10,
            recentActivity: history.slice(0, 5)
          });
        }
      }
      setLoading(false);
    };

    calculateStats();
  }, [user, getUserHistory]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  const successRate = stats.totalGenerations > 0 
    ? Math.round((stats.completedGenerations / stats.totalGenerations) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Total Generations</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGenerations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time activity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Images Generated</CardDescription>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImages}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Average Time</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageTime}s</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per generation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Success Rate</CardDescription>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <Progress value={successRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message for New Users */}
      {stats.totalGenerations === 0 && (
        <Card className="bg-gradient-subtle border-premium/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-premium" />
              Welcome to Glo AI Studio!
            </CardTitle>
            <CardDescription>
              Get started by choosing one of our 6 powerful image generation tools below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">Quick Generation</Badge>
              <Badge variant="outline" className="text-xs">Professional Results</Badge>
              <Badge variant="outline" className="text-xs">Multiple Formats</Badge>
              <Badge variant="outline" className="text-xs">AI-Powered</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips for Users */}
      {stats.totalGenerations > 0 && stats.totalGenerations < 5 && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-900">💡 Pro Tips</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Try different lighting styles for unique product shots</li>
              <li>• Use campaign generation for seasonal marketing</li>
              <li>• Experiment with AI vs Real models for different aesthetics</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};