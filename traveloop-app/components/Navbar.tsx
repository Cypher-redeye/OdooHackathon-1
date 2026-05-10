import Link from "next/link";
import { User, LogOut, Bell } from "lucide-react";

export function Navbar() {
  return (
    <nav className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40 w-full">
      <div className="flex items-center gap-2">
        <span className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
          Traveloop
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/dashboard" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Home</Link>
        <Link href="/trips" className="text-sm font-medium text-white/80 hover:text-white transition-colors">My Trips</Link>
        <Link href="/search/city" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Explore</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-amber rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold">
            T
          </div>
          <button className="text-white/60 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
