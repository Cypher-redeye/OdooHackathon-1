"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, MessageSquare, Heart, Share2, MapPin, Calendar, Compass } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CommunityPage() {
  const [query, setQuery] = useState("");
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityTrips = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/trips/all");
        if (res.ok) {
          const trips = await res.json();
          const posts = trips.map((trip: any) => ({
            id: trip.id,
            user: trip.user?.name || trip.user?.email || "Anonymous Traveler",
            avatar: (trip.user?.name || trip.user?.email || "A")[0].toUpperCase(),
            tripName: trip.name,
            duration: `${Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24))} Days`,
            location: trip.stops?.map((s: any) => s.city).join(", ") || "Global Destination",
            likes: Math.floor(Math.random() * 500) + 10,
            comments: Math.floor(Math.random() * 100) + 5,
            image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
            excerpt: trip.description || "Shared a new itinerary with the community!"
          }));
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
    post.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Community</h1>
          <p className="text-white/60">Discover itineraries and tips from fellow travelers</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search community posts..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass-input pl-10 py-2.5"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 glass-button text-sm font-medium text-white">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 glass-button text-sm font-medium text-white">
            <ArrowUpDown className="w-4 h-4" /> Sort by
          </button>
        </div>
      </div>

      {/* Community Feed */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {!isLoading && filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <Compass className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No trips found</h3>
            <p className="text-white/60">Be the first to share an itinerary!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants} className="glass-card overflow-hidden group">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={post.image} alt={post.tripName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                          {post.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{post.user}</p>
                          <p className="text-xs text-white/50">Shared an itinerary</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                      {post.tripName}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/60">
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        <Calendar className="w-4 h-4 text-primary-400" /> {post.duration}
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        <MapPin className="w-4 h-4 text-primary-400" /> {post.location}
                      </div>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-white/60 hover:text-accent-amber transition-colors group/btn">
                        <Heart className="w-5 h-5 group-hover/btn:fill-accent-amber transition-all" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-primary-400 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors hidden sm:flex">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    <Link href={`/trips/${post.id}`} className="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-primary-500/25 flex items-center gap-2">
                      <Compass className="w-4 h-4" /> View Itinerary
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
