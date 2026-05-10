"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Eye, Edit2, Trash2, PlusCircle, Compass, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const FILTERS = ["All", "Upcoming", "Past", "Draft"];

export default function MyTripsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        let userId = 1; // Fallback
        if (token) {
          try {
            const parts = token.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              if (payload.id) userId = payload.id;
            }
          } catch (e) {}
        }
        
        const res = await fetch(`http://127.0.0.1:5000/api/trips`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const fetchedTrips = await res.json();
          const formattedTrips = fetchedTrips.map((t: any) => ({
            id: t.id,
            status: new Date(t.endDate) < new Date() ? "Past" : "Upcoming",
            name: t.name,
            dates: `${new Date(t.startDate).toLocaleDateString()} - ${new Date(t.endDate).toLocaleDateString()}`,
            budget: t.budget ? `$${(t.budget.transport + t.budget.stay + t.budget.meals + t.budget.activities).toLocaleString()}` : "TBD",
            destCount: t.stops?.length || 0,
            image: t.imageUrl || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
          }));
          setTrips(formattedTrips);
        }
      } catch (err) {
        console.error("Failed to fetch trips", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(trip => {
    const matchesFilter = activeFilter === "All" || trip.status === activeFilter;
    const matchesSearch = trip.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:5000/api/trips/${deleteId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          setTrips(trips.filter(t => t.id !== deleteId));
          setDeleteId(null);
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-heading font-bold text-white">My Trips</h1>
            <span className="px-3 py-1 bg-primary-500/20 rounded-full border border-primary-500/30 text-xs font-bold text-primary-300">
              {trips.length} Total
            </span>
          </div>
          <p className="text-white/60">Your personal collection of world expeditions.</p>
        </div>
        <Link 
          href="/trips/create"
          className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-2xl font-bold shadow-xl shadow-primary-950/20 transition-all hover:-translate-y-0.5"
        >
          <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Plan New Adventure
        </Link>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search your trips by name..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass-input pl-11 py-3 rounded-2xl"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border ${
                activeFilter === filter 
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-600/20' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="w-10 h-10 animate-spin text-primary-400 mb-4" />
          <p className="text-white/40 font-medium tracking-wide">Retrieving your travel log...</p>
        </div>
      ) : filteredTrips.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card flex flex-col sm:flex-row overflow-hidden group hover:border-primary-500/30 transition-all shadow-xl hover:shadow-primary-600/5"
              >
                {/* Cover Image */}
                <div className="sm:w-[40%] h-52 sm:h-auto relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10" />
                  <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md border border-white/20 ${
                      trip.status === 'Upcoming' ? 'bg-primary-500/90 text-white' :
                      trip.status === 'Past' ? 'bg-white/10 text-white/80' :
                      'bg-accent-amber text-black'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-br from-[#1A120D] to-transparent">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-heading font-bold text-white leading-tight group-hover:text-primary-400 transition-colors">{trip.name}</h3>
                      <div className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-lg text-xs font-bold text-primary-400 whitespace-nowrap">
                        {trip.budget}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-white/60 text-sm">
                        <div className="p-1.5 bg-white/5 rounded-lg"><Calendar className="w-4 h-4 text-primary-400/70" /></div>
                        <span className="font-medium">{trip.dates}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/60 text-sm">
                        <div className="p-1.5 bg-white/5 rounded-lg"><MapPin className="w-4 h-4 text-primary-400/70" /></div>
                        <span className="font-medium">{trip.destCount} Destination{trip.destCount !== 1 && 's'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-5 border-t border-white/5">
                    <Link 
                      href={`/trips/${trip.id}`}
                      className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
                    >
                      <Eye className="w-4 h-4" /> VIEW
                    </Link>
                    <Link 
                      href={`/trips/${trip.id}/builder`}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" /> BUILD
                    </Link>
                    <button 
                      onClick={() => setDeleteId(trip.id)}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/10"
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card py-32 flex flex-col items-center justify-center text-center mt-10 border-dashed border-white/10"
        >
          <div className="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center mb-8 relative group">
            <div className="absolute inset-0 bg-primary-500/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
            <Compass className="w-14 h-14 text-primary-400/40 relative z-10 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <h3 className="text-3xl font-heading font-bold text-white mb-3">No matching trips found</h3>
          <p className="text-white/50 max-w-md mb-10 text-lg leading-relaxed px-6">
            {query 
              ? `We couldn't find any trips matching "${query}". Try a different search term?` 
              : "Your travel log is empty. The world's wonders are waiting to be added to your first itinerary!"}
          </p>
          <Link 
            href="/trips/create"
            className="px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-[2rem] font-bold shadow-2xl shadow-primary-900/30 transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-6 h-6" />
            Start Your First Trip
          </Link>
        </motion.div>
      )}

      <ConfirmDialog 
        isOpen={deleteId !== null}
        title="Permanently Delete Trip?"
        message="This will erase all stops, activities, and budget data associated with this trip. This action is irreversible."
        confirmText="Confirm Deletion"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
