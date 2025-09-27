import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader,
  Archive,
  Settings,
  Users
} from "lucide-react";

interface ProjectsSidebarProps {
  projects: any[];
  onCreateProject: () => void;
}

export function ProjectsSidebar({ projects, onCreateProject }: ProjectsSidebarProps) {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const getProjectCounts = () => {
    const counts = {
      all: projects.length,
      draft: projects.filter(p => p.status === 'draft').length,
      processing: projects.filter(p => p.status === 'processing').length,
      completed: projects.filter(p => p.status === 'completed').length,
      failed: projects.filter(p => p.status === 'failed').length,
    };
    return counts;
  };

  const counts = getProjectCounts();

  const navItems = [
    {
      title: "All Projects",
      url: "/projects",
      icon: LayoutDashboard,
      count: counts.all,
    },
    {
      title: "Draft",
      url: "/projects?status=draft",
      icon: Clock,
      count: counts.draft,
      color: "text-muted-foreground"
    },
    {
      title: "Processing",
      url: "/projects?status=processing", 
      icon: Loader,
      count: counts.processing,
      color: "text-primary"
    },
    {
      title: "Completed",
      url: "/projects?status=completed",
      icon: CheckCircle,
      count: counts.completed,
      color: "text-green-600"
    },
    {
      title: "Failed",
      url: "/projects?status=failed",
      icon: XCircle,
      count: counts.failed,
      color: "text-destructive"
    }
  ];

  const isActive = (path: string) => {
    if (path === "/projects") {
      return currentPath === "/projects" && !location.search;
    }
    return location.search.includes(path.split('?')[1]);
  };

  return (
    <Sidebar className={open ? "w-64" : "w-14"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onCreateProject} className="w-full bg-gradient-to-r from-primary via-primary-glow to-accent text-white hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  {open && <span>New Project</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Project Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive: navIsActive }) => 
                        `flex items-center justify-between w-full ${
                          navIsActive || isActive(item.url)
                            ? "bg-muted text-primary font-medium" 
                            : "hover:bg-muted/50"
                        }`
                      }
                    >
                      <div className="flex items-center">
                        <item.icon className={`mr-2 h-4 w-4 ${item.color || ""}`} />
                        {open && <span>{item.title}</span>}
                      </div>
                      {open && item.count > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {item.count}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Team Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="mr-2 h-4 w-4" />
                  {open && <span>Collaborators</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="mr-2 h-4 w-4" />
                  {open && <span>Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        {open && projects.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.slice(0, 3).map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton className="text-xs">
                      <FolderOpen className="mr-2 h-3 w-3" />
                      <span className="truncate">{project.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}