"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, DollarSign, TrendingUp, Filter, X } from "lucide-react";

const DESTINATIONS = [
  { id: 1, city: "Bali", country: "Indonesia", cost: "Low", stars: 4.8, trending: true, tags: ["Beach", "Culture"], image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, city: "Paris", country: "France", cost: "High", stars: 4.9, trending: true, tags: ["Romance", "Culture"], image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, city: "Dubai", country: "UAE", cost: "High", stars: 4.7, trending: false, tags: ["Luxury", "Shopping"], image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, city: "Tokyo", country: "Japan", cost: "Medium", stars: 4.9, trending: true, tags: ["Culture", "Food"], image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, city: "Santorini", country: "Greece", cost: "Medium", stars: 4.8, trending: false, tags: ["Beach", "Romance"], image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, city: "New York", country: "USA", cost: "High", stars: 4.6, trending: false, tags: ["City", "Shopping"], image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, city: "Maldives", country: "Maldives", cost: "High", stars: 4.9, trending: true, tags: ["Beach", "Luxury"], image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, city: "Barcelona", country: "Spain", cost: "Medium", stars: 4.7, trending: false, tags: ["Culture", "Beach"], image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1000&auto=format&fit=crop" },
];

const ALL_TAGS = ["All", "Beach", "Culture", "Romance", "Luxury", "Food", "City", "Shopping"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function SearchCityPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = DESTINATIONS.filter(dest => {
    const matchesQuery = dest.city.toLowerCase().includes(query.toLowerCase()) ||
                         dest.country.toLowerCase().includes(query.toLowerCase());
    const matchesTag = activeTag === "All" || dest.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Explore Destinations</h1>
        <p className="text-white/60">Discover your next adventure from around the world</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cities, countries..."
          className="w-full glass-input pl-12 pr-12 py-4 text-lg"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-5 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${
              activeTag === tag
                ? 'bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-500/20'
                : 'glass-button text-white/70'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeTag + query}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((dest) => (
            <motion.div
              key={dest.id}
              variants={itemVariants}
              className="glass-card overflow-hidden group cursor-pointer relative"
            >
              <div className="h-52 relative overflow-hidden">
                <img src={dest.image} alt={dest.city} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/30 to-transparent" />

                {dest.trending && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 bg-accent-amber/20 backdrop-blur-md border border-accent-amber/30 rounded-full text-[10px] font-bold text-accent-amber uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}

                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-xs font-bold text-white">
                  <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                  {dest.stars}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      {dest.city}
                    </h3>
                    <p className="text-white/60 text-sm ml-5.5">{dest.country}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    dest.cost === 'Low' ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30' :
                    dest.cost === 'Medium' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' :
                    'bg-accent-amber/20 text-accent-amber border border-accent-amber/30'
                  }`}>
                    {dest.cost} Cost
                  </span>
                </div>

                <div className="flex gap-1.5 mt-3">
                  {dest.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-white/10 rounded-full text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card py-20 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-primary-400/50" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-2">No destinations found</h3>
          <p className="text-white/60 max-w-sm">
            Try searching for a different city or adjusting your filters.
          </p>
        </motion.div>
      )}
    </div>
  );
}
