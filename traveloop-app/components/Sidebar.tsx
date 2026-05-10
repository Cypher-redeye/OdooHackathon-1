"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Search, User, PlusCircle } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/trips", label: "My Trips", icon: Map },
  { href: "/search/city", label: "Search", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-white/5 backdrop-blur-md h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto">
      <Link 
        href="/trips/create"
        className="flex items-center gap-3 px-4 py-3 mb-6 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
      >
        <PlusCircle className="w-5 h-5" />
        <span className="font-medium">Plan New Trip</span>
      </Link>

      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                isActive 
                  ? "bg-white/10 text-white shadow-[inset_4px_0_0_rgba(124,58,237,1)]" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={clsx("w-5 h-5", isActive && "text-primary-400")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-xs text-white/60 mb-2">Pro tip</p>
          <p className="text-sm font-medium">Use the <span className="text-accent-teal">AI Insight</span> button when budgeting to get personalized tips!</p>
        </div>
      </div>
    </aside>
  );
}
