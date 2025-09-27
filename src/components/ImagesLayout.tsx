import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ImagesSidebar } from "@/components/ImagesSidebar";
import Header from "@/components/Header";

interface ImagesLayoutProps {
  children: React.ReactNode;
  selectedTool: string | null;
  onToolSelect: (toolId: string | null) => void;
}

export const ImagesLayout = ({ children, selectedTool, onToolSelect }: ImagesLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ImagesSidebar selectedTool={selectedTool} onToolSelect={onToolSelect} />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="relative flex-1 pt-16">
            {/* Sidebar Toggle Button */}
            <SidebarTrigger className="fixed top-20 left-4 z-40 bg-background border border-border shadow-md hover:bg-muted/50" />
            <main className="overflow-auto h-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};