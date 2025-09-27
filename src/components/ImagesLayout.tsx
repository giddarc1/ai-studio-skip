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
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <div className="flex min-h-0 flex-1 pt-16">
          <ImagesSidebar selectedTool={selectedTool} onToolSelect={onToolSelect} />
          <main className="flex-1 min-h-0 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};