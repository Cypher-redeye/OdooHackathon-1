"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, DollarSign, TrendingUp, Filter, X } from "lucide-react";

const ALL_TAGS = ["All", "Beach", "Culture", "Romance", "Luxury", "Food", "City", "Shopping"];

const DESTINATIONS_DB = [
  { id: 'in-1', city: "Mumbai", country: "India", cost: "Value", stars: "4.8", trending: true, tags: ["City", "Food"], image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800" },
  { id: 'in-2', city: "Jaipur", country: "India", cost: "Value", stars: "4.7", trending: true, tags: ["Culture", "History"], image: "https://images.unsplash.com/photo-1599661046289-e31887846eac?w=800" },
  { id: 'in-3', city: "Goa", country: "India", cost: "Value", stars: "4.9", trending: true, tags: ["Beach", "Party"], image: "https://images.unsplash.com/photo-1512789172734-7b9803a44bdf?w=800" },
  { id: 'in-4', city: "Delhi", country: "India", cost: "Value", stars: "4.6", trending: false, tags: ["City", "Food"], image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800" },
  { id: 'in-5', city: "Manali", country: "India", cost: "Value", stars: "4.9", trending: true, tags: ["Nature", "Adventure"], image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800" },
  { id: 'in-6', city: "Bangalore", country: "India", cost: "Value", stars: "4.7", trending: true, tags: ["City", "Tech"], image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800" },
  { id: 'gl-1', city: "Paris", country: "France", cost: "Premium", stars: "4.9", trending: true, tags: ["Culture", "Romance"], image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800" },
  { id: 'gl-2', city: "Tokyo", country: "Japan", cost: "Premium", stars: "4.9", trending: false, tags: ["City", "Culture"], image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" },
  { id: 'gl-3', city: "Dubai", country: "UAE", cost: "Luxury", stars: "4.7", trending: true, tags: ["Luxury", "Shopping"], image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800" },
  { id: 'gl-4', city: "London", country: "UK", cost: "Premium", stars: "4.8", trending: true, tags: ["City", "History"], image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800" },
  { id: 'gl-5', city: "New York", country: "USA", cost: "Luxury", stars: "4.8", trending: false, tags: ["City", "Shopping"], image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800" },
  { id: 'gl-6', city: "Singapore", country: "Singapore", cost: "Luxury", stars: "4.8", trending: true, tags: ["City", "Luxury"], image: "https://images.unsplash.com/photo-1525625239514-46d9bba056e1?w=800" },
];

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
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/trips/all");
        let communityDests: any[] = [];
        
        if (res.ok) {
          const trips = await res.json();
          const destsMap = new Map();
          trips.forEach((trip: any) => {
            if (trip.stops) {
              trip.stops.forEach((stop: any) => {
                if (!destsMap.has(stop.city)) {
                  destsMap.set(stop.city, {
                    id: stop.id,
                    city: stop.city,
                    country: "Community Trip",
                    cost: "Value",
                    stars: "4.5",
                    trending: true,
                    tags: ["Community"],
                    image: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800`
                  });
                }
              });
            }
          });
          communityDests = Array.from(destsMap.values());
        }

        const combined = [...DESTINATIONS_DB];
        communityDests.forEach(cd => {
          if (!combined.some(d => d.city.toLowerCase() === cd.city.toLowerCase())) {
            combined.push(cd);
          }
        });

        setDestinations(combined);
      } catch (err) {
        setDestinations(DESTINATIONS_DB);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const filtered = (() => {
    let results = destinations.filter(dest => {
      const matchesQuery = dest.city.toLowerCase().includes(query.toLowerCase()) ||
                           dest.country.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag === "All" || dest.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });

    if (query.trim().length > 1 && !results.some(r => r.city.toLowerCase().startsWith(query.toLowerCase()))) {
      results.push({
        id: `dynamic-${query}`,
        city: query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(),
        country: "New Discovery",
        cost: "Value",
        stars: "4.5",
        trending: true,
        tags: ["Discovery", activeTag !== "All" ? activeTag : "City"],
        image: `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800`,
        isDynamic: true
      });
    }

    return results;
  })();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Explore Destinations</h1>
        <p className="text-white/60">Discover your next adventure from around the world</p>
      </div>

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

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 border ${
              activeTag === tag
                ? "bg-primary-500/20 border-primary-500/50 text-primary-400"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                variants={itemVariants}
                layout
                className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="absolute inset-0 bg-white/5" />
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  {dest.trending && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-amber/20 backdrop-blur-md border border-accent-amber/40 rounded-full text-[10px] font-bold text-accent-amber uppercase tracking-wider">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                  <Star className="w-3 h-3 text-accent-amber fill-accent-amber" />
                  {dest.stars}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {dest.city}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:text-primary-400 transition-colors">
                      {dest.city}, <span className="text-white/60">{dest.country}</span>
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {dest.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-medium text-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-lg text-xs font-semibold text-primary-400">
                      {dest.cost} Cost
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg shadow-primary-500/40">
                    Plan Trip
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
