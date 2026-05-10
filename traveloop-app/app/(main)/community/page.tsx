"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, MessageSquare, Heart, Share2, MapPin, Calendar, Compass, Star, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 22 } }
};

export default function CommunityPage() {
  const [query, setQuery] = useState("");
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityTrips = async () => {
      setIsLoading(true);
      try {
        // Using 127.0.0.1 for maximum reliability on local environments
        const res = await fetch(`${API_URL}/api/trips/all`);
        if (res.ok) {
          const trips = await res.json();
          const posts = trips.map((trip: any) => {
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

            return {
              id: trip.id,
              user: trip.user?.name || trip.user?.email?.split('@')[0] || "Premium Traveler",
              avatar: (trip.user?.name || trip.user?.email || "P")[0].toUpperCase(),
              tripName: trip.name,
              duration: `${diffDays} Day${diffDays !== 1 ? 's' : ''}`,
              location: trip.stops?.map((s: any) => s.city).join(", ") || "Global Destination",
              likes: Math.floor(Math.random() * 500) + 10,
              comments: Math.floor(Math.random() * 100) + 5,
              image: trip.imageUrl || "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
              excerpt: trip.description || "Crafted a unique itinerary for this beautiful destination. Looking forward to exploring more!"
            };
          });
          setCommunityPosts(posts);
        }
      } catch (err) {
        console.error("Failed to load community trips", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunityTrips();
  }, []);

  const filteredPosts = communityPosts.filter(post => 
    post.tripName.toLowerCase().includes(query.toLowerCase()) ||
    post.location.toLowerCase().includes(query.toLowerCase()) ||
    post.user.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4 pb-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-accent-amber/10 border border-accent-amber/20 rounded-full text-[10px] font-black text-accent-amber uppercase tracking-[0.2em] mb-4 w-fit">
            <Star className="w-3 h-3 fill-accent-amber" /> Shared Expeditions
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Traveler <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Explore authentic itineraries curated by our global community of explorers.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-[1.5rem] font-bold border border-white/10 transition-all flex items-center gap-3">
            <Share2 className="w-5 h-5 text-primary-400" />
            Share Your Journey
          </button>
        </motion.div>
      </div>

      {/* Modern Control Bar */}
      <div className="glass-card p-2 flex flex-col md:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search by destination, trip name, or explorer..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border-none focus:ring-1 focus:ring-primary-500/50 rounded-2xl pl-12 py-3.5 text-white placeholder:text-white/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto p-1">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold text-white transition-all uppercase tracking-widest border border-white/5">
            <Filter className="w-4 h-4 text-primary-400" /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold text-white transition-all uppercase tracking-widest border border-white/5">
            <ArrowUpDown className="w-4 h-4 text-primary-400" /> Sort
          </button>
        </div>
      </div>

      {/* Feed Section */}
      <div className="space-y-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 glass-card border-dashed border-white/10">
            <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-6" />
            <p className="text-white/40 text-lg font-medium animate-pulse">Syncing community logs...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 glass-card border-dashed border-white/10"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Compass className="w-12 h-12 text-white/20" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-3">No itineraries found</h3>
            <p className="text-white/40 max-w-md mx-auto text-lg leading-relaxed">
              We couldn't find any shared journeys matching your search. Be the first to light the way!
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-10"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants} className="glass-card overflow-hidden group hover:border-primary-500/40 transition-all duration-500">
                <div className="flex flex-col lg:flex-row">
                  {/* Visual Impact */}
                  <div className="w-full lg:w-[38%] h-72 lg:h-auto relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img src={post.image} alt={post.tripName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                    <div className="absolute top-6 left-6 z-20">
                      <div className="flex items-center gap-3 bg-[#0F0A07]/80 backdrop-blur-md px-4 py-2 rounded-[1.5rem] border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-black text-white shadow-lg">
                          {post.avatar}
                        </div>
                        <span className="text-xs font-bold text-white tracking-wide">{post.user}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Intel Section */}
                  <div className="p-8 lg:p-12 flex-1 flex flex-col justify-between bg-gradient-to-br from-[#1A120D] to-transparent">
                    <div>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-bold text-primary-400 uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5" /> {post.duration}
                        </span>
                        <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-bold text-accent-teal uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5" /> {post.location}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-heading font-bold text-white mb-4 group-hover:text-primary-400 transition-colors leading-tight">
                        {post.tripName}
                      </h3>
                      
                      <p className="text-white/60 text-lg leading-relaxed mb-8 line-clamp-3 italic">
                        "{post.excerpt}"
                      </p>
                    </div>
                    
                    {/* Social Hub */}
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                      <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2.5 text-white/40 hover:text-red-400 transition-all group/btn transform hover:scale-110">
                          <Heart className="w-6 h-6 group-hover/btn:fill-red-400 transition-all" />
                          <span className="text-sm font-black">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2.5 text-white/40 hover:text-primary-400 transition-all transform hover:scale-110">
                          <MessageSquare className="w-6 h-6" />
                          <span className="text-sm font-black">{post.comments}</span>
                        </button>
                      </div>
                      
                      <Link 
                        href={`/trips/${post.id}`} 
                        className="group/link flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl text-sm font-black transition-all shadow-xl shadow-primary-950/20 active:scale-95"
                      >
                        EXPLORE LOGS <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
