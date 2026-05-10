import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 px-4 md:px-8 py-6">
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
