import { useState } from "react";
import { Users, FileText, Upload, UserPlus, Wand2, Eye, Download, CheckCircle, Settings, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import projectsHero from "@/assets/projects-hero.jpg";
import teamCollaborationDemo from "@/assets/team-collaboration-demo.jpg";
import batchProcessingDemo from "@/assets/batch-processing-demo.jpg";
import qualityControlDemo from "@/assets/quality-control-demo.jpg";

interface Project {
  id: string;
  name: string;
  status: 'processing' | 'completed' | 'failed' | 'draft';
  created_at: string;
  updated_at: string;
  image_count: number;
  category: string;
  thumbnail_url?: string;
}

const Projects = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Summer Collection 2024',
      status: 'completed',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T14:30:00Z',
      image_count: 12,
      category: 'apparel',
      thumbnail_url: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Jewelry Campaign',
      status: 'processing',
      created_at: '2024-01-22T09:00:00Z',
      updated_at: '2024-01-22T09:00:00Z',
      image_count: 8,
      category: 'jewelry',
      thumbnail_url: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Electronics Showcase',
      status: 'draft',
      created_at: '2024-01-25T11:00:00Z',
      updated_at: '2024-01-25T11:00:00Z',
      image_count: 5,
      category: 'electronics'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false);

  const handleCreateProject = async (projectData: any) => {
    // In real app, this would create project via Supabase
    console.log('Creating project:', projectData);
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name,
      status: 'processing',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_count: projectData.files.length,
      category: projectData.category,
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const handleEditProject = (project: any) => {
    toast({
      title: "Edit Project",
      description: `Editing ${project.name} - Feature coming soon!`,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    });
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setProjectDetailsOpen(true);
  };

  const handleDownloadProject = (project: any) => {
    toast({
      title: "Download Started",
      description: `Downloading results for ${project.name}`,
    });
  };

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show dashboard for logged-in users
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <title>My Projects - Lens AI Studio</title>
        <meta name="description" content="Manage your AI-powered product photography projects. Create, edit, and track your professional product images." />
        
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-2">
                  My Projects
                </h1>
                <p className="text-muted-foreground">
                  Manage and track your AI-powered product photography projects
                </p>
              </div>
              <Button 
                onClick={() => setCreateProjectOpen(true)}
                className="bg-gradient-to-r from-primary via-primary-glow to-accent hover:shadow-glow transition-all duration-300 mt-4 md:mt-0"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="home">Home & Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                    onView={handleViewProject}
                    onDownload={handleDownloadProject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' 
                    ? "Try adjusting your search or filters"
                    : "Create your first project to get started"
                  }
                </p>
                <Button 
                  onClick={() => setCreateProjectOpen(true)}
                  className="bg-gradient-to-r from-primary via-primary-glow to-accent"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>
            )}
          </div>
        </main>

        <CreateProjectDialog
          open={createProjectOpen}
          onOpenChange={setCreateProjectOpen}
          onCreateProject={handleCreateProject}
        />

        <ProjectDetailsModal
          project={selectedProject}
          open={projectDetailsOpen}
          onOpenChange={setProjectDetailsOpen}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
          onDownload={handleDownloadProject}
        />
      </div>
    );
  }

  // Show marketing page for non-logged-in users
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
      icon: Users,
      image: teamCollaborationDemo
    },
    {
      title: "Batch Processing",
      description: "Process multiple products at once with consistent styling and automated workflows.",
      icon: Settings,
      image: batchProcessingDemo
    },
    {
      title: "Quality Control",
      description: "Built-in approval workflows ensure every image meets your brand standards.",
      icon: CheckCircle,
      image: qualityControlDemo
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
        <section className="pt-24 pb-12 bg-gradient-subtle relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src={projectsHero} 
              alt="Team collaboration in professional photography studio" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 container mx-auto px-6">
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
              <Button 
                size="lg" 
                className="bg-gradient-premium hover:opacity-90 text-white px-8 py-4 text-lg"
                onClick={() => window.location.href = '/sign-in'}
              >
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

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projectFeatures.map((feature, index) => (
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
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join brands using our platform to create professional product photography.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-premium hover:opacity-90 text-white px-6 py-3"
                onClick={() => window.location.href = '/sign-in'}
              >
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