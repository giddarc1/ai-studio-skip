import { useState } from "react";
import { Image, Upload, Palette, Users, Camera, Wand2, User, LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

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

  const imageOptions = [
    {
      id: "plain-background",
      icon: Palette,
      title: "Plain Background Images",
      description: "Generate clean product shots with customizable backgrounds and lighting",
      inputs: ["Clear product image", "Background color (default: white)", "Lighting style", "Number of angles"],
      badge: "Quick Setup",
      demoImage: plainBackgroundDemo
    },
    {
      id: "background-replacement",
      icon: Image,
      title: "Background Replacement",
      description: "Replace backgrounds with AI-powered environment transformation",
      inputs: ["Product image", "Reference background image", "Product placement", "Theme selection"],
      badge: "Popular",
      demoImage: jewelryAfter
    },
    {
      id: "ai-model",
      icon: Wand2,
      title: "AI Model Integration",
      description: "Generate images with AI models wearing or using your products",
      inputs: ["Product image", "Product type", "Product dimensions", "Style/Pose selection"],
      badge: "AI Powered",
      demoImage: aiModelDemo
    },
    {
      id: "real-model",
      icon: Users,
      title: "Real Model Integration", 
      description: "Create lifestyle shots with realistic model imagery",
      inputs: ["Product image", "Product type", "Product dimensions", "Model style/pose"],
      badge: "Realistic",
      demoImage: apparelAfter
    },
    {
      id: "campaign-shots",
      icon: Camera,
      title: "Campaign Photography",
      description: "Create marketing-ready campaign images for special occasions",
      inputs: ["Product images", "Campaign reference image", "Model type (AI/Real)", "Product measurements", "Campaign style"],
      badge: "Premium",
      demoImage: campaignDemo
    },
    {
      id: "prompt-editing",
      icon: Upload,
      title: "Prompt-Based Generation",
      description: "Generate and edit images using natural language prompts",
      inputs: ["Base image (optional)", "Text prompts", "Style preferences", "Edit instructions"],
      badge: "Flexible",
      demoImage: electronicsAfter
    }
  ];

  const imageFeatures = [
    {
      title: "Instant Results",
      description: "Generate professional images in minutes, not hours. Perfect for quick projects and immediate needs.",
      icon: Wand2,
      image: instantResultsDemo
    },
    {
      title: "Solo Friendly",
      description: "No team coordination needed. Simple workflows designed for individual creators and small businesses.",
      icon: User,
      image: soloFriendlyDemo
    },
    {
      title: "Versatile Options",
      description: "6 specialized tools covering everything from basic backgrounds to complex campaign photography.",
      icon: Image,
      image: versatileOptionsDemo
    }
  ];

  const themeOptions = ["Traditional", "Modern", "Festival", "Minimalist", "Luxury", "Outdoor"];
  const campaignStyles = ["Christmas", "Valentine's Day", "Summer Sale", "Black Friday", "New Year", "Spring Collection"];

  const renderImageOptionDemo = (option: typeof imageOptions[0]) => {
    if (!user) {
      return (
        <Card className="opacity-75 overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={option.demoImage} 
              alt={`${option.title} demo`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <LogIn className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Sign in to access this feature</p>
              </div>
            </div>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                  <option.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <Badge variant="secondary" className="mt-1">{option.badge}</Badge>
                </div>
              </div>
            </div>
            <CardDescription className="text-base mt-2">{option.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Required Inputs:</h4>
              <ul className="space-y-2">
                {option.inputs.map((input, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    {input}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={option.demoImage} 
            alt={`${option.title} demo`} 
            className="w-full h-full object-cover hover-scale transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">{option.badge}</Badge>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
              <option.icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <CardDescription className="text-base mt-1">{option.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Render specific form based on option type */}
          {option.id === "plain-background" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-image">Product Image</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label htmlFor="bg-color">Background Color</Label>
                <Input type="color" defaultValue="#ffffff" />
              </div>
              <div>
                <Label>Lighting Style</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lighting style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural Light</SelectItem>
                    <SelectItem value="studio">Studio Light</SelectItem>
                    <SelectItem value="dramatic">Dramatic</SelectItem>
                    <SelectItem value="soft">Soft Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Number of Angles</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select angles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Angle</SelectItem>
                    <SelectItem value="3">3 Angles</SelectItem>
                    <SelectItem value="5">5 Angles</SelectItem>
                    <SelectItem value="8">8 Angles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {option.id === "background-replacement" && (
            <div className="space-y-4">
              <div>
                <Label>Product Image</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label>Reference Background Image (Optional)</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label>Background Theme</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map(theme => (
                      <SelectItem key={theme} value={theme.toLowerCase()}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Product Placement</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select placement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="floating">Floating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {(option.id === "ai-model" || option.id === "real-model") && (
            <div className="space-y-4">
              <div>
                <Label>Product Image</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label>Product Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Product Dimensions</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Width (cm)" />
                  <Input placeholder="Height (cm)" />
                  <Input placeholder="Depth (cm)" />
                </div>
              </div>
              <div>
                <Label>Style/Pose Selection</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {option.id === "campaign-shots" && (
            <div className="space-y-4">
              <div>
                <Label>Product Images</Label>
                <Input type="file" accept="image/*" multiple />
              </div>
              <div>
                <Label>Campaign Reference Image</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label>Model Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI Model</SelectItem>
                    <SelectItem value="real">Real Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Campaign Style</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign style" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignStyles.map(style => (
                      <SelectItem key={style} value={style.toLowerCase().replace(/\s/g, '-')}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {option.id === "prompt-editing" && (
            <div className="space-y-4">
              <div>
                <Label>Base Image (Optional)</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label>Generation Prompt</Label>
                <textarea 
                  className="w-full p-3 border rounded-md resize-none h-24"
                  placeholder="Describe the image you want to generate or how you want to edit the existing image..."
                />
              </div>
              <div>
                <Label>Style Preferences</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photorealistic">Photorealistic</SelectItem>
                    <SelectItem value="artistic">Artistic</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Button className="w-full mt-6 bg-gradient-premium hover:opacity-90 text-white">
            Generate Images
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Images - AI-Powered Product Photography Generation | Studio</title>
      <meta name="description" content="Generate stunning product images with AI. Choose from 6 powerful options: plain backgrounds, model integration, campaign shots, and prompt-based editing." />
      
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
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
                
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                ) : !user ? (
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
                ) : (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <User className="w-4 h-4 mr-2" />
                    Welcome {user.user_metadata?.full_name || user.email?.split('@')[0]}! All Tools Available
                  </Badge>
                )}
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

        {/* Before/After Gallery */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                See the Transformation
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real examples of how our AI transforms ordinary product photos into professional images
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={jewelryBefore} alt="Jewelry before AI enhancement" className="w-full h-32 object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={jewelryAfter} alt="Jewelry after AI enhancement" className="w-full h-32 object-cover" />
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</div>
                  </div>
                </div>
                <h3 className="font-semibold text-center">Jewelry Enhancement</h3>
              </div>

              <div className="group">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={apparelBefore} alt="Apparel before AI enhancement" className="w-full h-32 object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={apparelAfter} alt="Apparel after AI enhancement" className="w-full h-32 object-cover" />
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</div>
                  </div>
                </div>
                <h3 className="font-semibold text-center">Fashion Photography</h3>
              </div>

              <div className="group">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={electronicsBefore} alt="Electronics before AI enhancement" className="w-full h-32 object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={electronicsAfter} alt="Electronics after AI enhancement" className="w-full h-32 object-cover" />
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</div>
                  </div>
                </div>
                <h3 className="font-semibold text-center">Tech Products</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Image Generation Options */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                6 Ways to Generate Images
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                Choose the perfect tool for your image generation needs
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
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
                        {!user && (
                          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                            <LogIn className="h-3 w-3" />
                            <span>Sign in to access</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose Images?
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
