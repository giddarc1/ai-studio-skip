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
          <main className="flex-1 pt-16 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};