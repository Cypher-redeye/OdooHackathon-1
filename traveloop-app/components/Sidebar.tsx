"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Search, User, PlusCircle, Users, Settings, Compass, Sparkles, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/trips", label: "My Trips", icon: Map },
  { href: "/search/city", label: "Find Cities", icon: Search },
  { href: "/search/activity", label: "Discover Activities", icon: Compass },
  { href: "/community", label: "Community", icon: Users },
  { href: "/admin", label: "Admin Panel", icon: ShieldCheck },
  { href: "/profile", label: "My Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-white/5 backdrop-blur-md h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto">
      <Link 
        href="/trips/create"
        className="flex items-center gap-3 px-4 py-3 mb-6 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(160,114,75,0.3)] hover:shadow-[0_0_20px_rgba(160,114,75,0.5)] group"
      >
        <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        <span className="font-medium">Plan New Trip</span>
      </Link>

      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          // Precise active logic: exact match for dashboard, startsWith for others
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 bg-primary-400 rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              <item.icon className={clsx("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-primary-400" : "text-white/40")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="p-4 bg-gradient-to-br from-primary-900/30 via-[#1A120D] to-transparent rounded-2xl border border-white/10 group cursor-pointer hover:border-primary-500/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary-400 group-hover:rotate-12 transition-transform" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Traveloop Pro</p>
          </div>
          <p className="text-sm font-medium text-white/80 leading-relaxed mb-3">
            Unlock <span className="text-white font-bold italic">AI Insights</span> in any Trip Budget.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary-400 group-hover:translate-x-1 transition-transform">
            VIEW LATEST TIPS ➔
          </div>
        </div>
      </div>
    </aside>
  );
}

// Helper to keep motion import clean if I forgot it
import { motion } from "framer-motion";
