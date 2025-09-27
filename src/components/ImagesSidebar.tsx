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
  Palette,
  Image,
  Wand2,
  Users,
  Camera,
  Sparkles,
  History,
  FolderOpen,
  BarChart3,
  Zap
} from "lucide-react";

interface ImagesSidebarProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string | null) => void;
}

export function ImagesSidebar({ selectedTool, onToolSelect }: ImagesSidebarProps) {
  const { open } = useSidebar();
  const location = useLocation();
  const [activeView, setActiveView] = useState('dashboard');

  const imageTools = [
    {
      id: "plain_background" as const,
      icon: Palette,
      title: "Plain Background",
      badge: "Quick",
      popular: true
    },
    {
      id: "background_replacement" as const,
      icon: Image,
      title: "Background Replace",
      badge: "Popular",
      popular: true
    },
    {
      id: "ai_model" as const,
      icon: Wand2,
      title: "AI Model",
      badge: "AI Powered",
      popular: false
    },
    {
      id: "real_model" as const,
      icon: Users,
      title: "Real Model",
      badge: "Realistic",
      popular: false
    },
    {
      id: "campaign_shots" as const,
      icon: Camera,
      title: "Campaign Shots",
      badge: "Premium",
      popular: false
    },
    {
      id: "prompt_generation" as const,
      icon: Sparkles,
      title: "Custom Prompt",
      badge: "Flexible",
      popular: false
    }
  ];

  const popularTools = imageTools.filter(tool => tool.popular);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view === 'dashboard') {
      onToolSelect(null);
    }
  };

  const handleToolSelect = (toolId: string) => {
    onToolSelect(toolId);
    setActiveView('generate');
  };

  const navItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      onClick: () => handleViewChange('dashboard')
    },
    {
      id: "history",
      title: "History",
      icon: History,
      onClick: () => handleViewChange('history')
    },
    {
      id: "gallery",
      title: "Gallery",
      icon: FolderOpen,
      onClick: () => handleViewChange('gallery')
    }
  ];

  return (
    <Sidebar className={open ? "w-64" : "w-14"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className={`w-full ${
                      activeView === item.id 
                        ? "bg-muted text-primary font-medium" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {open && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Start</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {popularTools.map((tool) => (
                <SidebarMenuItem key={tool.id}>
                  <SidebarMenuButton
                    onClick={() => handleToolSelect(tool.id)}
                    className={`w-full ${
                      selectedTool === tool.id
                        ? "bg-muted text-primary font-medium"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <tool.icon className="mr-2 h-4 w-4" />
                        {open && <span className="text-sm">{tool.title}</span>}
                      </div>
                      {open && (
                        <Badge variant="secondary" className="text-xs">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>All Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {imageTools.map((tool) => (
                <SidebarMenuItem key={tool.id}>
                  <SidebarMenuButton
                    onClick={() => handleToolSelect(tool.id)}
                    className={`w-full ${
                      selectedTool === tool.id
                        ? "bg-muted text-primary font-medium"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <tool.icon className="mr-2 h-3 w-3" />
                        {open && <span className="text-xs">{tool.title}</span>}
                      </div>
                      {open && !tool.popular && (
                        <Badge variant="outline" className="text-xs">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Stats */}
        {open && (
          <SidebarGroup>
            <SidebarGroupLabel>Stats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-xs cursor-default">
                    <BarChart3 className="mr-2 h-3 w-3" />
                    <span className="flex-1 text-left">Images Generated</span>
                    <Badge variant="secondary" className="text-xs">42</Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-xs cursor-default">
                    <Zap className="mr-2 h-3 w-3" />
                    <span className="flex-1 text-left">Credits Used</span>
                    <Badge variant="secondary" className="text-xs">156</Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}