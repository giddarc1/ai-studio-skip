import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle,
  RotateCcw,
  Calendar,
  Image,
  Tag,
  User
} from "lucide-react";

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

interface ProjectDetailsModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onDownload: (project: Project) => void;
}

const ProjectDetailsModal = ({ 
  project, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete, 
  onDownload 
}: ProjectDetailsModalProps) => {
  if (!project) return null;

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'processing':
        return <RotateCcw className="h-4 w-4 text-primary" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'draft':
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Mock generated images for demo
  const generatedImages = [
    { id: 1, url: '/api/placeholder/300/300', name: 'product-1-enhanced.jpg' },
    { id: 2, url: '/api/placeholder/300/300', name: 'product-2-enhanced.jpg' },
    { id: 3, url: '/api/placeholder/300/300', name: 'product-3-enhanced.jpg' },
    { id: 4, url: '/api/placeholder/300/300', name: 'product-4-enhanced.jpg' },
  ];

  const originalImages = [
    { id: 1, url: '/api/placeholder/300/300', name: 'original-1.jpg' },
    { id: 2, url: '/api/placeholder/300/300', name: 'original-2.jpg' },
    { id: 3, url: '/api/placeholder/300/300', name: 'original-3.jpg' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {project.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Image className="h-4 w-4" />
                  {project.image_count} images
                </span>
              </DialogDescription>
            </div>
                <Badge variant="outline" className={getStatusColor(project.status)}>
                  {getStatusIcon(project.status)}
                  <span className="ml-2">{project.status === 'processing' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="originals">Originals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-2 capitalize">{project.status}</span>
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium capitalize">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Images:</span>
                    <span className="font-medium">{project.image_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">{new Date(project.updated_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.status === 'processing' && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Processing images...</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Estimated completion: 5 minutes
                      </p>
                    </div>
                  )}
                  {project.status === 'completed' && (
                    <div className="text-center space-y-2">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="font-medium">Project Completed</p>
                      <p className="text-sm text-muted-foreground">
                        All images have been processed successfully
                      </p>
                    </div>
                  )}
                  {project.status === 'failed' && (
                    <div className="text-center space-y-2">
                      <XCircle className="h-12 w-12 text-destructive mx-auto" />
                      <p className="font-medium">Processing Failed</p>
                      <p className="text-sm text-muted-foreground">
                        There was an error processing your images
                      </p>
                    </div>
                  )}
                  {project.status === 'draft' && (
                    <div className="text-center space-y-2">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="font-medium">Draft Project</p>
                      <p className="text-sm text-muted-foreground">
                        Ready to start processing
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {project.status === 'completed' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {generatedImages.map((image) => (
                  <div key={image.id} className="group relative">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 truncate">{image.name}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                  {getStatusIcon(project.status)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
                  <p className="text-muted-foreground">
                    {project.status === 'processing' 
                      ? 'Your images are being processed. Results will appear here when ready.'
                      : project.status === 'draft'
                      ? 'Start processing to see your enhanced images here.'
                      : 'Processing failed. Please try again or contact support.'
                    }
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="originals" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {originalImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 truncate">{image.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onEdit(project)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onDelete(project.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
          {project.status === 'completed' && (
            <Button onClick={() => onDownload(project)} className="bg-gradient-to-r from-primary via-primary-glow to-accent">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;