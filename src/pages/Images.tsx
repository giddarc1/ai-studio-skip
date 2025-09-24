import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Wand2, 
  Download, 
  Lock, 
  Image, 
  Users, 
  Camera, 
  Sparkles, 
  Palette,
  MessageSquare
} from "lucide-react";

const Images = () => {
  // Mock login state - replace with actual auth when Supabase is connected
  const isLoggedIn = false;

  const imageOptions = [
    {
      id: "plain-background",
      title: "Plain Background Images",
      description: "Generate clean product shots with customizable backgrounds",
      icon: Palette,
      inputs: ["Product Image", "Background Color", "Lighting Style", "Number of Angles"],
      mockPreview: "Clean product on colored background"
    },
    {
      id: "replace-background", 
      title: "Background Replacement",
      description: "Replace product backgrounds with custom themes",
      icon: Image,
      inputs: ["Product Image", "Reference Image", "Product Placement", "Theme Style"],
      mockPreview: "Product in new environment"
    },
    {
      id: "ai-model",
      title: "AI Model Integration", 
      description: "Generate images with AI models wearing/using your product",
      icon: Sparkles,
      inputs: ["Product Image", "Product Type", "Dimensions", "Style/Pose Selection"],
      mockPreview: "AI model showcasing product"
    },
    {
      id: "real-model",
      title: "Real Model Integration",
      description: "Create realistic model shots with your products", 
      icon: Users,
      inputs: ["Product Image", "Product Type", "Dimensions", "Model Style/Pose"],
      mockPreview: "Real model with product"
    },
    {
      id: "campaign-shots",
      title: "Campaign Images",
      description: "Generate themed campaign photography",
      icon: Camera,
      inputs: ["Product Images", "Campaign Reference", "Model Type", "Measurements", "Campaign Style"],
      mockPreview: "Themed campaign photography"
    },
    {
      id: "prompt-generation",
      title: "Prompt-Based Generation",
      description: "Create and edit images using text prompts",
      icon: MessageSquare,
      inputs: ["Text Prompts", "Image Editing Commands", "Style Parameters"],
      mockPreview: "Custom prompt-generated imagery"
    }
  ];

  const LoginPrompt = () => (
    <div className="text-center py-12">
      <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Login Required
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Sign in to access all image generation tools and start creating professional jewelry photography
      </p>
      <Button className="bg-gradient-primary hover:opacity-90">
        Login to Get Started
      </Button>
    </div>
  );

  const ImageGenerationForm = ({ option }: { option: typeof imageOptions[0] }) => (
    <div className="space-y-4">
      {option.inputs.map((input, idx) => (
        <div key={idx} className="space-y-2">
          <Label>{input}</Label>
          {input.includes("Image") ? (
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
            </div>
          ) : input.includes("Style") || input.includes("Theme") ? (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${input.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input placeholder={`Enter ${input.toLowerCase()}`} />
          )}
        </div>
      ))}
      
      <Button className="w-full bg-gradient-primary hover:opacity-90 mt-6">
        <Wand2 className="h-4 w-4 mr-2" />
        Generate Images
      </Button>
      
      {/* Mock Preview */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-dashed border-border">
        <div className="text-center">
          <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Preview: {option.mockPreview}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* SEO meta tags */}
      <title>Images - JewelStudio | AI Image Generation Tools</title>
      <meta name="description" content="Create stunning jewelry photography with AI. Generate plain backgrounds, replace environments, add models, create campaigns, and use text prompts for custom imagery." />
      
      <Header />
      <main className="min-h-screen pt-16">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                AI Image Generation
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Transform your jewelry photography with powerful AI tools - from simple backgrounds to complex campaign imagery
              </p>
              
              {/* Login Status */}
              {!isLoggedIn && (
                <div className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground mb-6">
                  <Lock className="h-4 w-4" />
                  <span>Login required to access image generation tools</span>
                </div>
              )}
            </div>

            {!isLoggedIn ? (
              /* Not Logged In - Show Visual Explanations */
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {imageOptions.map((option) => (
                    <Card key={option.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                            <option.icon className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base text-foreground">{option.title}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                          {option.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-4">
                          <p className="text-xs font-medium text-muted-foreground">Required Inputs:</p>
                          <ul className="space-y-1">
                            {option.inputs.map((input, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                {input}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3 border border-dashed border-border">
                          <div className="text-center">
                            <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">{option.mockPreview}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <LoginPrompt />
              </div>
            ) : (
              /* Logged In - Show Functional Interface */
              <div className="max-w-4xl mx-auto">
                <Tabs defaultValue="plain-background" className="w-full">
                  <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
                    {imageOptions.map((option) => (
                      <TabsTrigger key={option.id} value={option.id} className="text-xs">
                        <option.icon className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">{option.title.split(" ")[0]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {imageOptions.map((option) => (
                    <TabsContent key={option.id} value={option.id}>
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <option.icon className="h-6 w-6 text-primary" />
                            <div>
                              <CardTitle>{option.title}</CardTitle>
                              <CardDescription>{option.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ImageGenerationForm option={option} />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* Feature Highlight */}
            {!isLoggedIn && (
              <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10 max-w-4xl mx-auto">
                <div className="text-center">
                  <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Professional Results in Minutes
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    From simple background changes to complex campaign photography - create studio-quality images 
                    without the studio. Perfect for jewelry brands, e-commerce, and marketing teams.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Images;