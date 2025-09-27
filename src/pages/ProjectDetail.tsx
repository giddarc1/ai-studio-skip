import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Download, Calendar, Image, Tag, CheckCircle, Clock, XCircle, RotateCcw, Settings, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProjectsLayout } from "@/components/ProjectsLayout";
import { ProjectWorkflow } from "@/components/ProjectWorkflow";
import { ProjectCollaborators } from "@/components/ProjectCollaborators";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import summerJewelry from "@/assets/summer-collection-jewelry.jpg";
import luxuryJewelry from "@/assets/jewelry-campaign-luxury.jpg";
import smartJewelry from "@/assets/electronics-smart-jewelry.jpg";

interface Project {
  id: string;
  name: string;
  status: 'processing' | 'completed' | 'failed' | 'draft';
  created_at: string;
  updated_at: string;
  image_count: number;
  category: string;
  thumbnail_url?: string;
  workflow_step?: number;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  // Mock projects data - in real app would fetch from Supabase
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Summer Collection 2024',
      status: 'completed',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T14:30:00Z',
      image_count: 12,
      category: 'apparel',
      thumbnail_url: summerJewelry,
      workflow_step: 4
    },
    {
      id: '2',
      name: 'Jewelry Campaign',
      status: 'processing',
      created_at: '2024-01-22T09:00:00Z',
      updated_at: '2024-01-22T09:00:00Z',
      image_count: 8,
      category: 'jewelry',
      thumbnail_url: luxuryJewelry,
      workflow_step: 3
    },
    {
      id: '3',
      name: 'Electronics Showcase',
      status: 'draft',
      created_at: '2024-01-25T11:00:00Z',
      updated_at: '2024-01-25T11:00:00Z',
      image_count: 5,
      category: 'electronics',
      thumbnail_url: smartJewelry,
      workflow_step: 1
    }
  ]);

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/sign-in');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <ProjectsLayout projects={projects}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ProjectsLayout>
    );
  }

  if (!project) {
    return (
      <ProjectsLayout projects={projects}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
            <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
        </div>
      </ProjectsLayout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <RotateCcw className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'processing': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const handleEdit = () => {
    toast({
      title: "Edit Project",
      description: `Editing ${project.name} - Feature coming soon!`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete Project",
      description: `Deleting ${project.name} - Feature coming soon!`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading results for ${project.name}`,
    });
  };

  const handleWorkflowStepComplete = (step: number, data: any) => {
    toast({
      title: "Step Completed",
      description: `Workflow step ${step} completed successfully`,
    });
    // In real implementation, this would update the project in Supabase
    console.log('Workflow step completed:', step, data);
  };

  return (
    <>
      <title>{project.name} - Project Details | Glo AI Studio</title>
      <meta name="description" content={`View details and manage your ${project.name} project. Track progress, download results, and collaborate with your team.`} />

      <ProjectsLayout projects={projects}>
        <div className="h-full overflow-auto">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status === 'processing' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                      </Badge>
                      <Badge variant="outline">
                        <Tag className="h-3 w-3 mr-1" />
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <Tabs defaultValue="workflow" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="originals">Originals</TabsTrigger>
                <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="workflow" className="space-y-6">
                <ProjectWorkflow
                  projectId={project.id}
                  currentStep={project.workflow_step || 1}
                  onStepComplete={handleWorkflowStepComplete}
                />
              </TabsContent>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Images</p>
                          <p className="text-2xl font-bold">{project.image_count}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="text-sm font-medium">
                            {new Date(project.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Views</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>
                      Basic information about this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.status === 'completed' 
                          ? `Professional product photography project for ${project.category} category. All images have been processed and are ready for download.`
                          : `This project is currently ${project.status}. Check back later for updates.`
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <p className="text-sm text-muted-foreground mt-1 capitalize">{project.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Updated</label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(project.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest updates and changes to this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.status === 'completed' && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Project completed</p>
                            <p className="text-xs text-muted-foreground">All images processed successfully</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Project created</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(project.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Results</CardTitle>
                    <CardDescription>
                      AI-generated product images ready for download
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {project.status === 'completed' ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: project.image_count }).map((_, i) => (
                          <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <Image className="h-8 w-8 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="flex justify-center mb-4">
                          {project.status === 'processing' ? (
                            <RotateCcw className="h-8 w-8 text-primary" />
                          ) : (
                            <Clock className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {project.status === 'processing' 
                            ? 'Images are being processed...' 
                            : 'No results available yet'
                          }
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="originals" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Images</CardTitle>
                    <CardDescription>
                      Source images uploaded for this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Array.from({ length: Math.ceil(project.image_count / 2) }).map((_, i) => (
                        <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="collaborators" className="space-y-6">
                <ProjectCollaborators projectId={project.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ProjectsLayout>
    </>
  );
};

export default ProjectDetail;