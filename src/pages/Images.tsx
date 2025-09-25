import { useState } from "react";
import { Image, Upload, Palette, Users, Camera, Wand2, User, LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";

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

const Images = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const imageOptions = [
    {
      id: "plain-background",
      icon: Palette,
      title: "Plain Background",
      description: "Generate clean product shots with customizable backgrounds",
      inputs: ["Product image", "Background color", "Lighting style", "Number of angles"],
      badge: "Quick",
      demoImage: plainBackgroundDemo
    },
    {
      id: "background-replacement",
      icon: Image,
      title: "Background Replace",
      description: "Replace backgrounds with AI-powered environments",
      inputs: ["Product image", "Reference background", "Theme selection"],
      badge: "Popular",
      demoImage: jewelryAfter
    },
    {
      id: "ai-model",
      icon: Wand2,
      title: "AI Model",
      description: "Generate images with AI models wearing your products",
      inputs: ["Product image", "Product type", "Style selection"],
      badge: "AI Powered",
      demoImage: aiModelDemo
    },
    {
      id: "real-model",
      icon: Users,
      title: "Real Model", 
      description: "Create lifestyle shots with realistic model imagery",
      inputs: ["Product image", "Product type", "Model style"],
      badge: "Realistic",
      demoImage: apparelAfter
    },
    {
      id: "campaign-shots",
      icon: Camera,
      title: "Campaign",
      description: "Create marketing-ready campaign images",
      inputs: ["Product images", "Campaign reference", "Style selection"],
      badge: "Premium",
      demoImage: campaignDemo
    },
    {
      id: "prompt-editing",
      icon: Upload,
      title: "Prompt-Based",
      description: "Generate and edit images using natural language",
      inputs: ["Base image (optional)", "Text prompts", "Style preferences"],
      badge: "Flexible",
      demoImage: electronicsAfter
    }
  ];

  const themeOptions = ["Traditional", "Modern", "Festival", "Minimalist", "Luxury", "Outdoor"];
  const campaignStyles = ["Christmas", "Valentine's Day", "Summer Sale", "Black Friday", "New Year", "Spring Collection"];

  const renderImageOptionDemo = (option: typeof imageOptions[0]) => {
    if (!isLoggedIn) {
      return (
        <Card className="opacity-75 overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <img 
              src={option.demoImage} 
              alt={`${option.title} demo`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <LogIn className="h-6 w-6 mx-auto mb-1" />
                <p className="text-xs">Sign in to access</p>
              </div>
            </div>
          </div>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                <option.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <CardTitle className="text-base">{option.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">{option.badge}</Badge>
              </div>
            </div>
            <CardDescription className="text-sm">{option.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1">
              {option.inputs.slice(0, 3).map((input, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ArrowRight className="h-2 w-2" />
                  {input}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={option.demoImage} 
            alt={`${option.title} demo`} 
            className="w-full h-full object-cover hover-scale transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">{option.badge}</Badge>
          </div>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
              <option.icon className="h-4 w-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-base">{option.title}</CardTitle>
              <CardDescription className="text-sm">{option.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Simplified forms for each option */}
          {option.id === "plain-background" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Product Image</Label>
                <Input type="file" accept="image/*" className="h-8" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Background</Label>
                  <Input type="color" defaultValue="#ffffff" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">Lighting</Label>
                  <Select>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="soft">Soft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {option.id === "background-replacement" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Product Image</Label>
                <Input type="file" accept="image/*" className="h-8" />
              </div>
              <div>
                <Label className="text-xs">Theme</Label>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map(theme => (
                      <SelectItem key={theme} value={theme.toLowerCase()}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {(option.id === "ai-model" || option.id === "real-model") && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Product Image</Label>
                <Input type="file" accept="image/*" className="h-8" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Product Type</Label>
                  <Select>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Style</Label>
                  <Select>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {option.id === "campaign-shots" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Product Images</Label>
                <Input type="file" accept="image/*" multiple className="h-8" />
              </div>
              <div>
                <Label className="text-xs">Campaign Style</Label>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignStyles.slice(0, 4).map(style => (
                      <SelectItem key={style} value={style.toLowerCase().replace(/\s/g, '-')}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {option.id === "prompt-editing" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Base Image (Optional)</Label>
                <Input type="file" accept="image/*" className="h-8" />
              </div>
              <div>
                <Label className="text-xs">Generation Prompt</Label>
                <textarea 
                  className="w-full p-2 border rounded-md resize-none h-16 text-sm"
                  placeholder="Describe your desired image..."
                />
              </div>
            </div>
          )}

          <Button className="w-full mt-4 bg-gradient-premium hover:opacity-90 text-white h-8 text-sm">
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
        {/* Compact Hero Section */}
        <section className="pt-20 pb-8 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-4">
                Images
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Transform your product photos with 6 specialized AI tools - from simple backgrounds to campaign photography.
              </p>
              
              {!isLoggedIn ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
                  <Button 
                    size="lg" 
                    className="bg-gradient-premium hover:opacity-90 text-white"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In to Generate
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Access all image generation tools
                  </p>
                </div>
              ) : (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  All Tools Available
                </Badge>
              )}

              {/* Quick Before/After Examples */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="relative overflow-hidden rounded-lg">
                  <img src={jewelryAfter} alt="Jewelry enhancement" className="w-full h-16 object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img src={apparelAfter} alt="Fashion photography" className="w-full h-16 object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img src={electronicsAfter} alt="Product photography" className="w-full h-16 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Generation Options with Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                6 Ways to Generate Images
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect tool for your needs. Each option is designed for specific use cases.
              </p>
            </div>

            <Tabs defaultValue="plain-background" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
                {imageOptions.map((option) => (
                  <TabsTrigger 
                    key={option.id} 
                    value={option.id}
                    className="flex flex-col gap-1 p-2 text-xs"
                  >
                    <option.icon className="h-3 w-3" />
                    <span className="hidden sm:inline text-[10px]">{option.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {imageOptions.map((option) => (
                <TabsContent key={option.id} value={option.id}>
                  {renderImageOptionDemo(option)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Combined Features & CTA */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Why Choose Images?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Perfect for solo creators and quick turnaround projects
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center mb-2">
                  <Wand2 className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Instant Results</h3>
                <p className="text-xs text-muted-foreground">Generate in minutes</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center mb-2">
                  <User className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Solo Friendly</h3>
                <p className="text-xs text-muted-foreground">No team needed</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center mb-2">
                  <Image className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Versatile</h3>
                <p className="text-xs text-muted-foreground">6 specialized tools</p>
              </div>
            </div>

            {!isLoggedIn && (
              <Button 
                className="bg-gradient-premium hover:opacity-90 text-white"
                onClick={() => setIsLoggedIn(true)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Get Started Now
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Images;