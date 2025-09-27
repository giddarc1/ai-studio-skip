import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  RotateCcw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  status: 'processing' | 'completed' | 'failed' | 'draft';
  created_at: string;
  updated_at: string;
  image_count: number;
  thumbnail_url?: string;
  category: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onView: (project: Project) => void;
  onDownload: (project: Project) => void;
}

const ProjectCard = ({ project, onEdit, onDelete, onView, onDownload }: ProjectCardProps) => {
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

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-none tracking-tight">{project.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{project.category}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(project)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              {project.status === 'completed' && (
                <DropdownMenuItem onClick={() => onDownload(project)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Results
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => onDelete(project.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
          {project.thumbnail_url ? (
            <img 
              src={project.thumbnail_url} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Eye className="h-8 w-8" />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{project.image_count} image{project.image_count !== 1 ? 's' : ''}</span>
          <span>{new Date(project.updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline" className={getStatusColor(project.status)}>
            {getStatusIcon(project.status)}
            <span className="ml-2">{project.status === 'processing' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
          </Badge>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(project)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {project.status === 'completed' && (
              <Button 
                size="sm" 
                onClick={() => onDownload(project)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary via-primary-glow to-accent"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;