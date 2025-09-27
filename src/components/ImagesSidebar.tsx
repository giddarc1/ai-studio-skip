import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  Palette,
  Image,
  Wand2,
  Users,
  Camera,
  Sparkles,
  History,
  FolderOpen
} from "lucide-react";

interface ImagesSidebarProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string | null) => void;
}

export function ImagesSidebar({ selectedTool, onToolSelect }: ImagesSidebarProps) {
  const { open } = useSidebar();
  const [activeView, setActiveView] = useState('dashboard');

  const quickTools = [
    {
      id: "plain_background" as const,
      icon: Palette,
      title: "Plain Background"
    },
    {
      id: "background_replacement" as const,
      icon: Image,
      title: "Background Replace"
    },
    {
      id: "ai_model" as const,
      icon: Wand2,
      title: "AI Model"
    },
    {
      id: "real_model" as const,
      icon: Users,
      title: "Real Model"
    },
    {
      id: "campaign_shots" as const,
      icon: Camera,
      title: "Campaign Shots"
    },
    {
      id: "prompt_generation" as const,
      icon: Sparkles,
      title: "Custom Prompt"
    }
  ];

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
      
      <SidebarContent className="space-y-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className={`w-full ${
                      activeView === item.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {open && <span className="ml-2">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Generation Tools */}
        {open && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Generate
              </div>
              <SidebarMenu className="space-y-1">
                {quickTools.map((tool) => (
                  <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton
                      onClick={() => handleToolSelect(tool.id)}
                      className={`w-full text-sm ${
                        selectedTool === tool.id
                          ? "bg-muted text-primary font-medium"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <tool.icon className="h-4 w-4" />
                      <span className="ml-2">{tool.title}</span>
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