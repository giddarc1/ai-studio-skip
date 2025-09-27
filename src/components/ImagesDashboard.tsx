import { useState } from "react";
import { Image, Upload, Palette, Users, Camera, Wand2, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GenerationStats } from "@/components/ImageGeneration/GenerationStats";
import { GenerationHistory } from "@/components/ImageGeneration/GenerationHistory";
import { ImageGenerationForm } from "@/components/ImageGeneration/ImageGenerationForm";
import { useAuth } from "@/hooks/useAuth";

// Import images
import jewelryBefore from "@/assets/jewelry-before.jpg";
import jewelryAfter from "@/assets/jewelry-after.jpg";
import apparelBefore from "@/assets/apparel-before.jpg";
import apparelAfter from "@/assets/apparel-after.jpg";
import electronicsBefore from "@/assets/electronics-before.jpg";
import electronicsAfter from "@/assets/electronics-after.jpg";

interface ImagesDashboardProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string | null) => void;
  activeView: string;
}

export function ImagesDashboard({ selectedTool, onToolSelect, activeView }: ImagesDashboardProps) {
  const { user } = useAuth();

  const imageOptions = [
    {
      id: "plain_background" as const,
      icon: Palette,
      title: "Plain Background",
      description: "Clean product shots with custom backgrounds",
      badge: "Quick",
      category: "Basic",
      popular: true
    },
    {
      id: "background_replacement" as const,
      icon: Image,
      title: "Background Replace",
      description: "AI-powered background transformation",
      badge: "Popular",
      category: "Basic", 
      popular: true
    },
    {
      id: "ai_model" as const,
      icon: Wand2,
      title: "AI Model",
      description: "Generate with AI models wearing products",
      badge: "AI Powered",
      category: "Advanced",
      popular: false
    },
    {
      id: "real_model" as const,
      icon: Users,
      title: "Real Model",
      description: "Lifestyle shots with realistic models",
      badge: "Realistic",
      category: "Advanced",
      popular: false
    },
    {
      id: "campaign_shots" as const,
      icon: Camera,
      title: "Campaign Shots",
      description: "Marketing-ready campaign photography",
      badge: "Premium",
      category: "Professional",
      popular: false
    },
    {
      id: "prompt_generation" as const,
      icon: Sparkles,
      title: "Custom Prompt",
      description: "Generate using natural language",
      badge: "Flexible",
      category: "Creative",
      popular: false
    }
  ];

  const popularTools = imageOptions.filter(tool => tool.popular);

  if (activeView === 'history') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Generation History
          </h2>
          <p className="text-muted-foreground">
            View and manage your generated images
          </p>
        </div>
        <GenerationHistory />
      </div>
    );
  }

  if (activeView === 'gallery') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Inspiration Gallery
          </h2>
          <p className="text-muted-foreground">
            Browse examples and get inspiration
          </p>
        </div>
        
        {/* Before/After Gallery */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-2 gap-1">
              <div className="relative aspect-square">
                <img src={jewelryBefore} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</div>
              </div>
              <div className="relative aspect-square">
                <img src={jewelryAfter} alt="After" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-base">Jewelry Enhancement</CardTitle>
              <CardDescription className="text-sm">Professional background replacement</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-2 gap-1">
              <div className="relative aspect-square">
                <img src={apparelBefore} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</div>
              </div>
              <div className="relative aspect-square">
                <img src={apparelAfter} alt="After" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-base">Fashion Photography</CardTitle>
              <CardDescription className="text-sm">AI model integration</CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-2 gap-1">
              <div className="relative aspect-square">
                <img src={electronicsBefore} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</div>
              </div>
              <div className="relative aspect-square">
                <img src={electronicsAfter} alt="After" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-base">Electronics Showcase</CardTitle>
              <CardDescription className="text-sm">Campaign photography</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedTool) {
    const tool = imageOptions.find(t => t.id === selectedTool);
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onToolSelect(null)}
            className="gap-2"
          >
            ← Back to Dashboard
          </Button>
        </div>
        
        {tool && (
          <ImageGenerationForm
            generationType={tool.id}
            title={tool.title}
            description={tool.description}
            badge={tool.badge}
            icon={tool.icon}
          />
        )}
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
        </h1>
        <p className="text-muted-foreground">
          Create stunning product photography with AI
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-12">
        <GenerationStats />
      </div>

      {/* Popular Tools */}
      <div className="mb-12">
        <h2 className="text-lg font-medium text-foreground mb-6">Popular Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {popularTools.map((tool) => (
            <Card 
              key={tool.id} 
              className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-border/50"
              onClick={() => onToolSelect(tool.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <tool.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base font-medium">{tool.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {tool.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* All Tools */}
      <div>
        <h2 className="text-lg font-medium text-foreground mb-6">All Tools</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {imageOptions.map((tool) => (
            <Card 
              key={tool.id} 
              className="cursor-pointer hover:shadow-sm transition-shadow duration-200 border-border/50"
              onClick={() => onToolSelect(tool.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <tool.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <CardTitle className="text-sm font-medium">{tool.title}</CardTitle>
                </div>
                <CardDescription className="text-xs mt-2 line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}