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
  { href: "/community", label: "Social", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F0A07]/95 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = item.href === "/dashboard" 
          ? pathname === "/dashboard" 
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "relative flex flex-col items-center justify-center w-full h-full transition-all duration-300",
              isActive ? "text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="bottom-nav-active-pill"
                className="absolute top-0 w-8 h-0.5 bg-primary-400 rounded-full shadow-[0_0_12px_rgba(160,114,75,0.6)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon className={clsx("w-5 h-5 mb-0.5 transition-transform", isActive ? "scale-110 text-primary-400" : "scale-100")} />
            <span className={clsx("text-[9px] font-bold uppercase tracking-tighter", isActive ? "text-primary-400" : "text-white/30")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
