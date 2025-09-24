import { Users, Image, FileText, Upload, Wand2, Share } from "lucide-react";

const HowItWorks = () => {
  const projectsWorkflow = [
    { icon: FileText, title: "Brief & Concept", description: "Define your vision and requirements" },
    { icon: Users, title: "Model Selection", description: "Choose from our diverse model library" },
    { icon: Upload, title: "Product Upload", description: "Upload your product images securely" },
    { icon: Wand2, title: "AI Generation", description: "Our AI creates stunning visuals" },
    { icon: Share, title: "Team Collaboration", description: "Review and refine with your team" }
  ];

  const imagesWorkflow = [
    { icon: Image, title: "Plain Backgrounds", description: "Start with clean product shots" },
    { icon: Wand2, title: "Background Replacement", description: "AI transforms environments instantly" },
    { icon: Users, title: "AI/Real Model Shots", description: "Add models or lifestyle context" },
    { icon: FileText, title: "Campaign Images", description: "Create marketing-ready visuals" },
    { icon: Upload, title: "Prompt-Based Edits", description: "Fine-tune with simple text commands" }
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Two powerful paths to create professional product photography
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Projects Path */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-premium bg-clip-text text-transparent mb-4">
                <Users className="h-8 w-8 text-premium" />
                <h3 className="text-2xl font-bold text-foreground">Projects</h3>
              </div>
              <p className="text-muted-foreground">Full photoshoot workflow for teams</p>
            </div>

            <div className="space-y-6">
              {projectsWorkflow.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images Path */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-premium bg-clip-text text-transparent mb-4">
                <Image className="h-8 w-8 text-premium" />
                <h3 className="text-2xl font-bold text-foreground">Images</h3>
              </div>
              <p className="text-muted-foreground">Quick solo creation for individuals</p>
            </div>

            <div className="space-y-6">
              {imagesWorkflow.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;