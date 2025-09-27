import { useState } from "react";
import { Image, Upload, Palette, Users, Camera, Wand2, User, LogIn, History, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { ImagesLayout } from "@/components/ImagesLayout";
import { ImagesDashboard } from "@/components/ImagesDashboard";

// Import images
import heroImage from "@/assets/images-hero.jpg";
import aiModelDemo from "@/assets/ai-model-demo.jpg";
import plainBackgroundDemo from "@/assets/plain-background-demo.jpg";
import campaignDemo from "@/assets/campaign-demo.jpg";
import jewelryBefore from "@/assets/jewelry-before.jpg";
import jewelryAfter from "@/assets/jewelry-after.jpg";
import apparelBefore from "@/assets/apparel-before.jpg";
import apparelAfter from "@/assets/apparel-after.jpg";
import electronicsBefore from "@/assets/electronics-before.jpg";
import electronicsAfter from "@/assets/electronics-after.jpg";
import instantResultsDemo from "@/assets/instant-results-demo.jpg";
import soloFriendlyDemo from "@/assets/solo-friendly-demo.jpg";
import versatileOptionsDemo from "@/assets/versatile-options-demo.jpg";

const Images = () => {
  const { user, loading } = useAuth();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('dashboard');

  const imageOptions = [
    {
      id: "plain_background" as const,
      icon: Palette,
      title: "Plain Background",
      description: "Clean product shots with custom backgrounds",
      badge: "Quick",
      category: "Basic",
      demoImage: plainBackgroundDemo,
      popular: true
    },
    {
      id: "background_replacement" as const,
      icon: Image,
      title: "Background Replace",
      description: "AI-powered background transformation",
      badge: "Popular",
      category: "Basic", 
      demoImage: jewelryAfter,
      popular: true
    },
    {
      id: "ai_model" as const,
      icon: Wand2,
      title: "AI Model",
      description: "Generate with AI models wearing products",
      badge: "AI Powered",
      category: "Advanced",
      demoImage: aiModelDemo,
      popular: false
    },
    {
      id: "real_model" as const,
      icon: Users,
      title: "Real Model",
      description: "Lifestyle shots with realistic models",
      badge: "Realistic",
      category: "Advanced",
      demoImage: apparelAfter,
      popular: false
    },
    {
      id: "campaign_shots" as const,
      icon: Camera,
      title: "Campaign Shots",
      description: "Marketing-ready campaign photography",
      badge: "Premium",
      category: "Professional",
      demoImage: campaignDemo,
      popular: false
    },
    {
      id: "prompt_generation" as const,
      icon: Sparkles,
      title: "Custom Prompt",
      description: "Generate using natural language",
      badge: "Flexible",
      category: "Creative",
      demoImage: electronicsAfter,
      popular: false
    }
  ];

  const popularTools = imageOptions.filter(tool => tool.popular);
  const allTools = imageOptions;

  const imageFeatures = [
    {
      title: "Instant Results",
      description: "Generate professional images in minutes, not hours.",
      icon: Wand2,
      image: instantResultsDemo
    },
    {
      title: "Solo Friendly", 
      description: "Simple workflows for individual creators.",
      icon: User,
      image: soloFriendlyDemo
    },
    {
      title: "Versatile Options",
      description: "6 specialized AI-powered generation tools.",
      icon: Image,
      image: versatileOptionsDemo
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <title>Images - AI-Powered Product Photography Generation | Glo AI Studio</title>
      <meta name="description" content="Generate stunning product images with AI. Choose from 6 powerful options: plain backgrounds, model integration, campaign shots, and prompt-based editing." />
      
      {/* Global Header only for non-logged users */}
      {!user && <Header />}
      <main className="min-h-screen">
        {/* Clean Sidebar Interface for Logged-in Users */}
        {user ? (
          <>
            <title>Images - AI-Powered Product Photography Generation | Glo AI Studio</title>
            <meta name="description" content="Generate stunning product images with AI. Choose from 6 powerful options: plain backgrounds, model integration, campaign shots, and prompt-based editing." />
            
            <ImagesLayout 
              selectedTool={selectedTool} 
              onToolSelect={(toolId) => {
                setSelectedTool(toolId);
                setActiveView(toolId ? 'generate' : 'dashboard');
              }}
            >
              <ImagesDashboard
                selectedTool={selectedTool}
                onToolSelect={(toolId) => {
                  setSelectedTool(toolId);
                  setActiveView(toolId ? 'generate' : 'dashboard');
                }}
                activeView={activeView}
              />
            </ImagesLayout>
          </>
        ) : (
          <>
            {/* Hero Section for non-logged users */}
            <section className="pt-24 pb-12 bg-gradient-subtle relative overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                  <div className="text-center lg:text-left">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-6">
                      Images
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                      Quick and powerful AI image generation for individual creators
                    </p>
                    <p className="text-lg text-muted-foreground mb-12">
                      Transform your product photos with 6 specialized AI tools. From simple background changes 
                      to complex campaign photography - create professional images in minutes.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                      <Button 
                        size="lg" 
                        className="bg-gradient-premium hover:opacity-90 text-white px-8 py-4 text-lg"
                        asChild
                      >
                        <Link to="/sign-in">
                          <LogIn className="w-5 h-5 mr-2" />
                          Sign In to Generate
                        </Link>
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Sign in to access all image generation tools
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={heroImage} 
                      alt="AI-powered product photography transformation showcase" 
                      className="rounded-2xl shadow-2xl w-full hover-scale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Sign-in prompt for non-logged users */}
            <section className="py-24">
              <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                      6 Ways to Generate Images
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                      Choose the perfect tool for your image generation needs
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {imageOptions.map((option, index) => (
                      <div key={index} className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                              <option.icon className="h-5 w-5 text-accent" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-foreground">{option.title}</h3>
                              <Badge variant="secondary" className="text-xs">{option.badge}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{option.description}</p>
                            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                              <LogIn className="h-3 w-3" />
                              <span>Sign in to access</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Features Comparison - Only show for non-logged users */}
        {!user && !loading && (
          <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Why Choose Glo AI Studio?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Perfect for solo creators, small businesses, and quick turnaround projects
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {imageFeatures.map((feature, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={`${feature.title} demo interface`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-3">
                        <feature.icon className="h-5 w-5 text-accent" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {!user && !loading && (
          <section className="py-24 bg-gradient-subtle">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Create Amazing Images?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Sign in to access all 6 image generation tools and start creating professional product photography.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-premium hover:opacity-90 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link to="/sign-in">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In Now
                </Link>
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Images;