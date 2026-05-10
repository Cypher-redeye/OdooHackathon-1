"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Wallet, Plus, Loader2, Compass, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  const [userName, setUserName] = useState("Traveler");
  const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Total Trips", value: 0, icon: Plane, color: "text-primary-400", bg: "bg-primary-400/10" },
    { label: "Upcoming", value: 0, icon: Calendar, color: "text-accent-teal", bg: "bg-accent-teal/10" },
    { label: "Total Budget Spent", value: "$0", icon: Wallet, color: "text-accent-amber", bg: "bg-accent-amber/10" },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const storedName = localStorage.getItem("userName");
      
      if (storedName) {
        setUserName(storedName.split(' ')[0]);
      }

      let userId = 1;

      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload.id) userId = payload.id;
            
            const resolvedName = payload.name || payload.email?.split('@')[0] || "Traveler";
            setUserName(resolvedName.split(' ')[0]);
            localStorage.setItem("userName", resolvedName);
          }
        } catch(e) {
          console.warn("Dashboard token parse error");
        }

        try {
          // Using 127.0.0.1 for maximum reliability on Windows local environments
          const res = await fetch(`http://127.0.0.1:5000/api/trips`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (res.ok) {
            const fetchedTrips = await res.json();
            const formattedTrips = fetchedTrips.map((t: any) => ({
              id: t.id,
              name: t.name,
              dates: `${new Date(t.startDate).toLocaleDateString()} - ${new Date(t.endDate).toLocaleDateString()}`,
              budget: "TBD",
              image: t.imageUrl || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
            }));
            
            setUpcomingTrips(formattedTrips);
            
            setStats([
              { label: "Total Trips", value: fetchedTrips.length, icon: Plane, color: "text-primary-400", bg: "bg-primary-400/10" },
              { label: "Upcoming", value: fetchedTrips.length, icon: Calendar, color: "text-accent-teal", bg: "bg-accent-teal/10" },
              { label: "Total Budget Spent", value: "$0", icon: Wallet, color: "text-accent-amber", bg: "bg-accent-amber/10" },
            ]);
          }
        } catch (err) {
          console.error("Failed to fetch trips for dashboard");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-xs font-bold text-primary-400 uppercase tracking-widest mb-4">
            <Star className="w-3 h-3 fill-primary-400" /> Traveler Dashboard
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 leading-tight">
            Welcome back, <span className="text-gradient">{userName}</span> 🎒
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            Your next adventure is just a few clicks away. Where will your curiosity take you today?
          </p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="shrink-0"
        >
          <Link 
            href="/trips/create"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-2xl font-bold shadow-[0_10px_30px_rgba(160,114,75,0.4)] transition-all hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Plan New Trip
          </Link>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants} 
            className="glass-card p-8 flex items-center gap-6 group hover:bg-white/10 transition-all border-white/5 hover:border-primary-500/20"
          >
            <div className={`p-5 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-heading font-bold text-white">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {stat.value}
                </motion.span>
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upcoming Trips */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary-400" />
              Your Active Itineraries
            </h2>
            <Link href="/trips" className="text-primary-400 hover:text-primary-300 text-sm font-bold flex items-center gap-2 group transition-colors">
              View All Trips <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 glass-card">
              <Loader2 className="w-8 h-8 animate-spin text-primary-400 mb-4" />
              <p className="text-white/40 text-sm font-medium">Syncing your travels...</p>
            </div>
          ) : upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.slice(0, 4).map((trip, i) => (
                <motion.div 
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-card overflow-hidden group cursor-pointer border-white/5 hover:border-primary-500/30 transition-all"
                >
                  <Link href={`/trips/${trip.id}`}>
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                      <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute top-4 right-4 z-20 bg-[#1A120D]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-xl">
                        {trip.budget}
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-[#1A120D] to-transparent">
                      <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Calendar className="w-4 h-4 text-primary-400/60" />
                        <span>{trip.dates}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <Compass className="w-16 h-16 mx-auto mb-6 text-primary-400/20" />
              <h3 className="text-xl font-bold text-white mb-2">No active trips found</h3>
              <p className="text-white/40 max-w-xs mx-auto mb-8">Ready to explore? Start by creating your first personalized itinerary.</p>
              <Link href="/trips/create" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all inline-flex items-center gap-2">
                Create First Trip <Plus className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Discover Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
            <Compass className="w-6 h-6 text-accent-teal" />
            Discover
          </h2>
          <div className="space-y-4">
            {[
              { title: "Top Destinations", desc: "Most planned cities this month", icon: Plane, color: "text-blue-400" },
              { title: "Community Tips", desc: "Secrets from fellow travelers", icon: Star, color: "text-accent-amber" },
              { title: "Travel Budgeting", desc: "Master your trip finances", icon: Wallet, color: "text-accent-teal" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 hover:bg-white/10 transition-all border-white/5 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary-500/20 transition-all ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-primary-300 transition-colors">{item.title}</h4>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-950 mt-4 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Compass className="w-24 h-24 rotate-12" />
              </div>
              <p className="text-xs font-bold text-primary-200 uppercase tracking-widest mb-2">Hackathon Special</p>
              <h4 className="text-xl font-heading font-bold text-white mb-4">Traveloop Community is Live!</h4>
              <Link href="/community" className="inline-flex items-center gap-2 px-5 py-2 bg-white text-primary-900 rounded-xl text-xs font-bold hover:bg-primary-100 transition-colors">
                Explore Feed <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
