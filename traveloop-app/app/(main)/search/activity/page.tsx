"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Clock, DollarSign, Filter, Plus, Compass } from "lucide-react";

const ACTIVITIES = [
  { id: 1, name: "Eiffel Tower Summit", city: "Paris", cost: 25, rating: 4.8, category: "Landmark", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Sushi Making Class", city: "Tokyo", cost: 80, rating: 4.9, category: "Food", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Burj Khalifa Observation Deck", city: "Dubai", cost: 45, rating: 4.7, category: "Landmark", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Grand Canyon Helicopter Tour", city: "Arizona", cost: 200, rating: 5.0, category: "Adventure", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Vatican Museums Tour", city: "Rome", cost: 30, rating: 4.6, category: "Culture", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Skydiving over Palm Jumeirah", city: "Dubai", cost: 500, rating: 4.9, category: "Adventure", image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=600&auto=format&fit=crop" },
];

export default function GlobalActivitySearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = ACTIVITIES.filter(a => 
    (category === "All" || a.category === category) &&
    (a.name.toLowerCase().includes(query.toLowerCase()) || a.city.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-10 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">Find Your <span className="text-primary-400">Next Experience</span></h1>
        <p className="text-white/60">Discover the best things to do in every corner of the world.</p>
      </div>

      <div className="glass-card p-6 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="text" 
            placeholder="Search activities or cities..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass-input pl-12"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Landmark", "Adventure", "Food", "Culture"].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((activity, idx) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="h-48 relative overflow-hidden">
                <img src={activity.image} alt={activity.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-accent-amber">
                  <Star className="w-3.5 h-3.5 fill-accent-amber" /> {activity.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-widest mb-2">
                  <Compass className="w-3.5 h-3.5" /> {activity.category}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">{activity.name}</h3>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" /> {activity.city}
                  </div>
                  <div className="text-2xl font-heading font-bold text-white">
                    <span className="text-sm font-sans font-medium text-white/40 mr-1">$</span>{activity.cost}
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-white/5 hover:bg-primary-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary-600/20">
                  <Plus className="w-4 h-4" /> Add to Trip
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
