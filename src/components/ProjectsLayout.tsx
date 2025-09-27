import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectsSidebar } from "@/components/ProjectsSidebar";
import Header from "@/components/Header";

interface ProjectsLayoutProps {
  children: React.ReactNode;
  projects: any[];
  onCreateProject: () => void;
}

export const ProjectsLayout = ({ children, projects, onCreateProject }: ProjectsLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <div className="flex flex-1 pt-16">
          <ProjectsSidebar projects={projects} onCreateProject={onCreateProject} />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};