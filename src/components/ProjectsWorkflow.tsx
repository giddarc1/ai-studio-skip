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
      title: "Brief & Concept",
      description: "Upload mood boards, style frames, and inspiration",
      icon: Palette
    },
    {
      id: 2,
      title: "Model Selection",
      description: "Choose AI models or upload custom model photos",
      icon: Users
    },
    {
      id: 3,
      title: "Product Upload",
      description: "Upload product images with white backgrounds",
      icon: Upload
    },
    {
      id: 4,
      title: "AI Generation",
      description: "Generate professional photoshoot images",
      icon: Sparkles
    },
    {
      id: 5,
      title: "Select & Edit",
      description: "Choose favorites and refine with prompts",
      icon: Edit3
    },
    {
      id: 6,
      title: "Save & Share",
      description: "Name project and collaborate with team",
      icon: Save
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Projects Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Complete end-to-end photoshoot creation with team collaboration
          </p>
          
          {/* Login Status Banner */}
          <div className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground mb-6">
            <Lock className="h-4 w-4" />
            <span>Login required to access Projects workflow</span>
          </div>
        </div>

        {/* Workflow Steps - Compact Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <Card key={step.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      Step {step.id}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Simplified card content without details */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsWorkflow;