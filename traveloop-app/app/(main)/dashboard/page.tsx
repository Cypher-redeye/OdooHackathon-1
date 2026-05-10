"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Wallet, MapPin, Star, Plus } from "lucide-react";
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
  const [stats, setStats] = useState([
    { label: "Total Trips", value: 0, icon: Plane, color: "text-primary-400", bg: "bg-primary-400/10" },
    { label: "Upcoming", value: 0, icon: Calendar, color: "text-accent-teal", bg: "bg-accent-teal/10" },
    { label: "Total Budget Spent", value: "$0", icon: Wallet, color: "text-accent-amber", bg: "bg-accent-amber/10" },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      let userId = 1;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.name) {
            setUserName(payload.name.split(' ')[0]);
          }
          if (payload.id) userId = payload.id;
        } catch(e) {}
      }

      try {
        const res = await fetch(`http://localhost:5000/api/trips/${userId}`);
        if (res.ok) {
          const fetchedTrips = await res.json();
          const formattedTrips = fetchedTrips.map((t: any) => ({
            id: t.id,
            name: t.name,
            dates: `${new Date(t.startDate).toLocaleDateString()} - ${new Date(t.endDate).toLocaleDateString()}`,
            budget: "TBD",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
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
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
            Welcome back, <span className="text-gradient">{userName}</span> ✈️
          </h1>
          <p className="text-white/60 text-lg">Ready for your next adventure?</p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Link 
            href="/trips/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(160,114,75,0.4)] transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
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
          <motion.div key={i} variants={itemVariants} className="glass-card p-6 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">{stat.label}</p>
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

      {/* Upcoming Trips */}
      {upcomingTrips.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-white">Your Trips</h2>
            <Link href="/trips" className="text-primary-400 hover:text-primary-300 text-sm font-medium">View All</Link>
          </div>
          
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 gap-6 snap-x">
            {upcomingTrips.map((trip, i) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className="glass-card min-w-[300px] md:min-w-[350px] overflow-hidden snap-start group cursor-pointer"
              >
                <Link href={`/trips/${trip.id}`}>
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                      {trip.budget}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{trip.name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.dates}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
