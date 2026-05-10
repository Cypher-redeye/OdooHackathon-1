"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Eye, Edit2, Trash2, PlusCircle, Compass } from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const FILTERS = ["All", "Upcoming", "Past", "Draft"];

export default function MyTripsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [trips, setTrips] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        let userId = 1; // Fallback
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.id) userId = payload.id;
          } catch (e) {}
        }
        
        const res = await fetch(`http://localhost:5000/api/trips/${userId}`);
        if (res.ok) {
          const fetchedTrips = await res.json();
          // Map backend format to frontend format
          const formattedTrips = fetchedTrips.map((t: any) => ({
            id: t.id,
            status: "Upcoming",
            name: t.name,
            dates: `${new Date(t.startDate).toLocaleDateString()} - ${new Date(t.endDate).toLocaleDateString()}`,
            budget: "TBD",
            destCount: t.stops?.length || 0,
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
          }));
          setTrips(formattedTrips);
        }
      } catch (err) {
        console.error("Failed to fetch trips", err);
      }
    };
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(trip => activeFilter === "All" || trip.status === activeFilter);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const res = await fetch(`http://localhost:5000/api/trips/${deleteId}`, {
          method: "DELETE"
        });
        if (res.ok) {
          setTrips(trips.filter(t => t.id !== deleteId));
          setDeleteId(null);
        } else {
          alert("Failed to delete trip");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">My Trips</h1>
          <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-sm font-bold text-primary-300">
            {filteredTrips.length}
          </div>
        </div>
        <Link 
          href="/trips/create"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(160,114,75,0.3)] transition-all hover:scale-105"
        >
          <PlusCircle className="w-5 h-5" />
          Plan New
        </Link>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              activeFilter === filter 
                ? 'bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-500/20' 
                : 'glass-button text-white/70'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredTrips.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass-card flex flex-col sm:flex-row overflow-hidden group"
              >
                {/* Cover Image */}
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 z-20">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      trip.status === 'Upcoming' ? 'bg-primary-500 text-white' :
                      trip.status === 'Past' ? 'bg-white/20 backdrop-blur-md text-white' :
                      'bg-accent-amber text-black'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-heading font-bold text-white leading-tight">{trip.name}</h3>
                      <div className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-accent-teal whitespace-nowrap">
                        {trip.budget}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <span>{trip.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <MapPin className="w-4 h-4 text-primary-400" />
                        <span>{trip.destCount} Destination{trip.destCount !== 1 && 's'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Link 
                      href={`/trips/${trip.id}`}
                      className="flex-1 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" /> View
                    </Link>
                    <Link 
                      href={`/trips/${trip.id}/builder`}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </Link>
                    <button 
                      onClick={() => setDeleteId(trip.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card py-20 flex flex-col items-center justify-center text-center mt-10"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-primary-400/50" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-white mb-2">No trips found</h3>
          <p className="text-white/60 max-w-sm mb-8">
            {activeFilter === "All" 
              ? "You haven't planned any trips yet. The world is waiting for you!" 
              : `You don't have any ${activeFilter.toLowerCase()} trips.`}
          </p>
          <Link 
            href="/trips/create"
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(160,114,75,0.3)] transition-all flex items-center gap-2 hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            Start Planning
          </Link>
        </motion.div>
      )}

      <ConfirmDialog 
        isOpen={deleteId !== null}
        title="Delete Trip"
        message="Are you sure you want to delete this trip? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
