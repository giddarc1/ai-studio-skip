import { 
  FileText, 
  Users, 
  Upload, 
  Wand2, 
  Edit3, 
  Save, 
  UserPlus,
  Image,
  Palette,
  Camera,
  Sparkles,
  ArrowRight,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsWorkflow = () => {
  const workflowSteps = [
    {
      id: 1,
      title: "Brief & Concept Development",
      description: "Upload mood boards, style frames, color palettes, sample poses and location inspiration",
      icon: Palette,
      details: [
        "Mood boards & inspiration",
        "Style frames & references", 
        "Color palettes",
        "Sample poses",
        "Location concepts"
      ],
      mockups: ["mood-board.jpg", "color-palette.jpg", "style-frame.jpg"]
    },
    {
      id: 2,
      title: "Model Selection",
      description: "Choose AI-based models or upload actual model images for the photoshoot",
      icon: Users,
      details: [
        "Browse AI model library",
        "Upload custom model photos",
        "Select multiple models",
        "Set model preferences"
      ],
      mockups: ["ai-models.jpg", "model-upload.jpg"]
    },
    {
      id: 3,
      title: "Product Upload",
      description: "Upload all product images with clean white backgrounds",
      icon: Upload,
      details: [
        "Drag & drop product images",
        "White background validation",
        "Image quality check", 
        "Batch upload support"
      ],
      mockups: ["product-upload.jpg", "white-bg-products.jpg"]
    },
    {
      id: 4,
      title: "AI Image Generation",
      description: "Generate professional photoshoot images combining products, models, and concepts",
      icon: Sparkles,
      details: [
        "AI processes all inputs",
        "Generates multiple variations",
        "Applies chosen style & mood",
        "Creates photoshoot scenes"
      ],
      mockups: ["generation-process.jpg", "generated-images.jpg"]
    },
    {
      id: 5,
      title: "Select & Edit",
      description: "Choose your favorite generated images and refine them with text prompts",
      icon: Edit3,
      details: [
        "Browse generated images",
        "Select favorites",
        "Text-to-edit prompts",
        "Real-time adjustments"
      ],
      mockups: ["image-selection.jpg", "prompt-editing.jpg"]
    },
    {
      id: 6,
      title: "Save & Collaborate",
      description: "Name your project, save progress, and invite team members to collaborate",
      icon: Save,
      details: [
        "Name & organize projects",
        "Save work in progress",
        "Invite team members",
        "Version control"
      ],
      mockups: ["project-save.jpg", "team-invite.jpg"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projects Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete end-to-end photoshoot creation with team collaboration
          </p>
          
          {/* Login Status Banner */}
          <div className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Login required to access full Projects workflow</span>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < workflowSteps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-px bg-gradient-to-b from-primary/50 to-transparent z-0" />
                )}
                
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Step {step.id}
                        </span>
                        {index < workflowSteps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Step Details */}
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Visual Mockup Placeholder */}
                      <div className="bg-muted/30 rounded-lg p-6 border border-dashed border-border">
                        <div className="flex items-center justify-center h-32">
                          <div className="text-center">
                            <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Interface Preview
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              {step.title} Screen
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6">
              Login to access the full Projects workflow and collaborate with your team
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Login to Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Team Collaboration Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
          <div className="text-center">
            <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Team Collaboration
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Invite team members to collaborate on projects, share feedback, and work together 
              on creating the perfect photoshoot images.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsWorkflow;