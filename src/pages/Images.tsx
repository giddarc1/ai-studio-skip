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
        <section className="pt-24 pb-12 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-6">
                Images
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Quick and powerful AI image generation for individual creators
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                Transform your product photos with 6 specialized AI tools. From simple background changes 
                to complex campaign photography - create professional images in minutes.
              </p>
              
              {!isLoggedIn ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-premium hover:opacity-90 text-white px-8 py-4 text-lg"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In to Generate
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access all image generation tools
                  </p>
                </div>
              ) : (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <User className="w-4 h-4 mr-2" />
                  Signed In - All Tools Available
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Image Generation Options */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                6 Ways to Generate Images
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect tool for your image generation needs. Each option is designed for specific use cases.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {imageOptions.map((option) => (
                <div key={option.id}>
                  {renderImageOptionDemo(option)}
                </div>
              ))}
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
              <Card>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-center">Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    Generate professional images in minutes, not hours. Perfect for quick projects and immediate needs.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                    <User className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-center">Solo Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    No team coordination needed. Simple workflows designed for individual creators and small businesses.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                    <Image className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-center">Versatile Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    6 specialized tools covering everything from basic backgrounds to complex campaign photography.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isLoggedIn && (
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
                onClick={() => setIsLoggedIn(true)}
              >
                <LogIn className="w-5 h-5 mr-2" />
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