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

const Images = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const imageOptions = [
    {
      id: "plain-background",
      icon: Palette,
      title: "Plain Background Images",
      description: "Generate clean product shots with customizable backgrounds and lighting",
      inputs: ["Clear product image", "Background color (default: white)", "Lighting style", "Number of angles"],
      badge: "Quick Setup"
    },
    {
      id: "background-replacement",
      icon: Image,
      title: "Background Replacement",
      description: "Replace backgrounds with AI-powered environment transformation",
      inputs: ["Product image", "Reference background image", "Product placement", "Theme selection"],
      badge: "Popular"
    },
    {
      id: "ai-model",
      icon: Wand2,
      title: "AI Model Integration",
      description: "Generate images with AI models wearing or using your products",
      inputs: ["Product image", "Product type", "Product dimensions", "Style/Pose selection"],
      badge: "AI Powered"
    },
    {
      id: "real-model",
      icon: Users,
      title: "Real Model Integration", 
      description: "Create lifestyle shots with realistic model imagery",
      inputs: ["Product image", "Product type", "Product dimensions", "Model style/pose"],
      badge: "Realistic"
    },
    {
      id: "campaign-shots",
      icon: Camera,
      title: "Campaign Photography",
      description: "Create marketing-ready campaign images for special occasions",
      inputs: ["Product images", "Campaign reference image", "Model type (AI/Real)", "Product measurements", "Campaign style"],
      badge: "Premium"
    },
    {
      id: "prompt-editing",
      icon: Upload,
      title: "Prompt-Based Generation",
      description: "Generate and edit images using natural language prompts",
      inputs: ["Base image (optional)", "Text prompts", "Style preferences", "Edit instructions"],
      badge: "Flexible"
    }
  ];

  const themeOptions = ["Traditional", "Modern", "Festival", "Minimalist", "Luxury", "Outdoor"];
  const campaignStyles = ["Christmas", "Valentine's Day", "Summer Sale", "Black Friday", "New Year", "Spring Collection"];

  const renderImageOptionDemo = (option: typeof imageOptions[0]) => {
    if (!isLoggedIn) {
      return (
        <Card className="opacity-75">
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
            <div className="space-y-3 mb-6">
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
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-muted rounded-lg bg-muted/30">
              <div className="text-center">
                <LogIn className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Sign in to access this feature</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
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
      {/* SEO meta tags */}
      <title>Images - AI-Powered Product Photography Generation | Studio</title>
      <meta name="description" content="Generate stunning product images with AI. Choose from 6 powerful options: plain backgrounds, model integration, campaign shots, and prompt-based editing." />
      
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-8 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-4">
                Images
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                AI image generation with 6 specialized tools - from backgrounds to campaign photography
              </p>
              
              {!isLoggedIn ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button 
                    className="bg-gradient-premium hover:opacity-90 text-white px-6 py-2"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In to Generate
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Access all generation tools
                  </p>
                </div>
              ) : (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <User className="w-4 h-4 mr-2" />
                  All Tools Available
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Image Generation Options */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="plain-background" className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Choose Your Generation Tool
                </h2>
              </div>

              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 h-auto">
                {imageOptions.map((option) => (
                  <TabsTrigger 
                    key={option.id} 
                    value={option.id}
                    className="flex flex-col items-center gap-1 p-3 text-xs"
                  >
                    <option.icon className="h-4 w-4" />
                    <span className="hidden sm:block">{option.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {imageOptions.map((option) => (
                <TabsContent key={option.id} value={option.id}>
                  <div className="max-w-2xl mx-auto">
                    {renderImageOptionDemo(option)}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Compact Benefits */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why Choose Images?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-3">
                  <Wand2 className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Generate professional images in minutes for quick social media and e-commerce needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-3">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Solo Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive tools designed for individual creators and small businesses.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-3">
                  <Image className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">6 Specialized Tools</h3>
                <p className="text-sm text-muted-foreground">
                  From simple backgrounds to complex campaign photography options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        {!isLoggedIn && (
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Create Amazing Images?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Sign in to access all 6 image generation tools and start creating professional product photography.
              </p>
              <Button 
                className="bg-gradient-premium hover:opacity-90 text-white px-6 py-3"
                onClick={() => setIsLoggedIn(true)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In Now
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Images;