import { Users, FileText, Upload, UserPlus, Wand2, Eye, Download, CheckCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  const projectWorkflow = [
    { 
      icon: FileText, 
      title: "Project Creation & Brief Setup", 
      description: "Create a new project with detailed brief, objectives, and style guidelines. Define the scope, timeline, and deliverables for your photoshoot campaign."
    },
    { 
      icon: UserPlus, 
      title: "Team Invitation & Role Assignment", 
      description: "Invite team members and assign specific roles - creative director, photographer, retoucher, or reviewer. Set permissions and collaboration levels."
    },
    { 
      icon: Users, 
      title: "Model Selection from Library", 
      description: "Browse and select from our diverse library of AI and real models. Filter by demographics, style preferences, and brand alignment."
    },
    { 
      icon: Upload, 
      title: "Product Upload & Organization", 
      description: "Upload and organize your product catalog with proper tagging, categorization, and metadata for efficient batch processing."
    },
    { 
      icon: Wand2, 
      title: "AI Generation & Batch Processing", 
      description: "Generate multiple variations using AI with consistent lighting, angles, and styling across your entire product range."
    },
    { 
      icon: Eye, 
      title: "Team Review & Approval Workflow", 
      description: "Collaborative review system with comments, annotations, and approval stages. Track feedback and revisions in real-time."
    },
    { 
      icon: Download, 
      title: "Final Deliverable Export", 
      description: "Export approved images in various formats and resolutions. Organize deliverables by campaign, product line, or usage rights."
    }
  ];

  const projectFeatures = [
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with role-based permissions and real-time collaboration tools.",
      icon: Users
    },
    {
      title: "Batch Processing",
      description: "Process multiple products at once with consistent styling and automated workflows.",
      icon: Settings
    },
    {
      title: "Quality Control",
      description: "Built-in approval workflows ensure every image meets your brand standards.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO meta tags */}
      <title>Projects - Team Collaboration for Product Photography | AI Studio</title>
      <meta name="description" content="Collaborate with your team to create stunning product photography campaigns. Streamlined workflow from brief to delivery with AI-powered generation." />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-6">
              Projects
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Full photoshoot workflow designed for teams and large-scale campaigns
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Streamline your product photography process from initial brief to final delivery. 
              Collaborate with your team, maintain brand consistency, and scale your visual content creation.
            </p>
            <Button size="lg" className="bg-gradient-premium hover:opacity-90 text-white px-8 py-4 text-lg">
              Start a Project
            </Button>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Project Workflow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive step-by-step process designed for professional teams and large-scale campaigns
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {projectWorkflow.map((step, index) => (
                <div key={index} className="bg-card rounded-2xl p-8 shadow-card">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mb-2">
                        <step.icon className="h-7 w-7 text-accent" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Step {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Projects?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for teams that need professional workflows and collaborative tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projectFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of brands using our collaborative platform to create stunning product photography at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-premium hover:opacity-90 text-white px-8 py-4 text-lg">
              Create Your First Project
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;