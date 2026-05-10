"use client";

import Link from "next/link";
import { LogOut, Bell, RefreshCw, User as UserIcon, Home, Compass, Map } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "@/lib/api";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Traveler");
  const [isSyncing, setIsSyncing] = useState(false);

  const resolveIdentity = (payload: any) => {
    if (payload.name && payload.name !== "Traveler") return payload.name;
    if (payload.email) return payload.email.split('@')[0];
    return "Traveler";
  };

  const fetchUserName = async () => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    
    // Initial UI state from cache
    if (storedName) setUserName(storedName);
    
    if (!token) return;

    setIsSyncing(true);
    try {
      // 1. Instant extraction from JWT
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const name = resolveIdentity(payload);
          setUserName(name);
          localStorage.setItem("userName", name);
        }
      } catch (e) {
        console.warn("JWT parse warning:", e);
      }

      // 2. Fresh fetch from server
      const urls = [
        `${API_URL}/api/auth/me`
      ];

      for (const url of urls) {
        try {
          const res = await fetch(url, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            const name = data.name || data.email?.split('@')[0] || "Traveler";
            setUserName(name);
            localStorage.setItem("userName", name);
            break; // Stop if one succeeds
          }
        } catch (e) {
          continue;
        }
      }
    } catch (err) {
      console.error("Identity resolution failed:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchUserName();
    window.addEventListener('focus', fetchUserName);
    return () => window.removeEventListener('focus', fetchUserName);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear everything for a fresh start
    router.push("/auth");
  };

  return (
    <nav className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40 w-full">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-3 group transition-all">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Traveloop Logo" 
              className="h-[36px] w-auto object-contain rounded-lg shadow-lg shadow-black/20"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 group-hover:from-primary-300 group-hover:to-primary-500 transition-all">
            Traveloop
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
        {[
          { name: "Home", href: "/dashboard", icon: Home },
          { name: "My Trips", href: "/trips", icon: Compass },
          { name: "Explore", href: "/search/city", icon: Map },
        ].map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative px-5 py-2 text-sm font-bold transition-all flex items-center gap-2 rounded-xl group ${
                isActive ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-800/10 border border-primary-500/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <link.icon className={`w-4 h-4 transition-colors ${isActive ? "text-primary-400" : "text-white/20 group-hover:text-white/40"}`} />
              <span className="relative z-10">{link.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={fetchUserName}
          className={`p-2 text-white/40 hover:text-white transition-all ${isSyncing ? 'animate-spin text-primary-400' : ''}`}
          title="Refresh Session"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        
        <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-amber rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-white/10 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/profile" 
            className="flex items-center gap-3 group px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-primary-600/20 group-hover:scale-110 transition-transform">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="hidden lg:block text-sm font-bold text-white group-hover:text-primary-400 transition-colors leading-none mb-0.5">
                {userName}
              </span>
              <span className="hidden lg:block text-[10px] text-white/40 leading-none font-medium uppercase tracking-tighter">
                {isSyncing ? "Syncing..." : "Traveloop Elite"}
              </span>
            </div>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
