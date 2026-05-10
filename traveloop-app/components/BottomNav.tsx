"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Search, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/trips", label: "Trips", icon: Map },
  { href: "/search/city", label: "Search", icon: Search },
  { href: "/community", label: "Community", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F0A07]/90 backdrop-blur-lg border-t border-white/10 z-50 flex items-center justify-around px-2">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center justify-center w-full h-full text-white/60 hover:text-white"
          >
            {isActive && (
              <motion.div
                layoutId="bottom-nav-indicator"
                className="absolute top-1 w-12 h-1 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(160,114,75,0.8)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className={clsx("w-5 h-5 mb-1", isActive && "text-primary-400")} />
            <span className={clsx("text-[10px] font-medium", isActive && "text-white")}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
