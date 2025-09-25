import { Users, FileText, Upload, UserPlus, Wand2, Eye, Download, CheckCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const Projects = () => {
  const projectWorkflow = [
    { 
      icon: FileText, 
      title: "Project Setup", 
      description: "Create project brief with objectives, style guidelines, and deliverables."
    },
    { 
      icon: UserPlus, 
      title: "Team Invitation", 
      description: "Invite team members and assign roles with appropriate permissions."
    },
    { 
      icon: Users, 
      title: "Model Selection", 
      description: "Choose from our diverse library of AI and real models."
    },
    { 
      icon: Upload, 
      title: "Product Upload", 
      description: "Upload and organize products with proper tagging and metadata."
    },
    { 
      icon: Wand2, 
      title: "AI Generation", 
      description: "Generate consistent images across your entire product range."
    },
    { 
      icon: Eye, 
      title: "Review & Approval", 
      description: "Collaborative review with comments and approval workflows."
    },
    { 
      icon: Download, 
      title: "Export & Delivery", 
      description: "Export approved images in multiple formats and resolutions."
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
      
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-6">
              Projects
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Team collaboration for large-scale product photography
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Streamlined workflow from brief to delivery with team collaboration and brand consistency.
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Project Workflow
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Step-by-step process for professional team collaboration
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {projectWorkflow.map((step, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                        <step.icon className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Projects?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {projectFeatures.map((feature, index) => (
                <Card key={index} className="text-center">
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
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join brands using our platform to create professional product photography.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-premium hover:opacity-90 text-white px-6 py-3">
                Create Project
              </Button>
              <Button size="lg" variant="outline" className="px-6 py-3">
                View Pricing
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Projects;