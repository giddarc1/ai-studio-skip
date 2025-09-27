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
import { Button } from "@/components/ui/button";
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
  X,
  ChevronLeft,
  Menu
} from "lucide-react";

interface ImagesSidebarProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string | null) => void;
}

export function ImagesSidebar({ selectedTool, onToolSelect }: ImagesSidebarProps) {
  const { open, toggleSidebar } = useSidebar();
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
      {/* Header with Toggle */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        {open && (
          <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0 hover:bg-muted"
          title={open ? "Hide sidebar (B)" : "Show sidebar (B)"}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      
      <SidebarContent className="space-y-4 pt-4">
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
                    tooltip={!open ? item.title : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    {open && <span className="ml-2">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Generation Tools - Show icons even when collapsed */}
        <SidebarGroup>
          <SidebarGroupContent>
            {open && (
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Generate
              </div>
            )}
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
                    tooltip={!open ? tool.title : undefined}
                  >
                    <tool.icon className="h-4 w-4" />
                    {open && <span className="ml-2">{tool.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}