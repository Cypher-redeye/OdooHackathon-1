"use client";

import { motion } from "framer-motion";
import { Share2, Link as LinkIcon, Twitter, Copy, MapPin, Calendar, Clock, DollarSign, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicItineraryPage({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCloning, setIsCloning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/trips/single/${params.id}`);
        if (res.ok) {
          setTrip(await res.json());
        } else {
          console.error("Trip not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [params.id]);

  const handleCopyTrip = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    setIsCloning(true);
    try {
      let userId = 1;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.id) userId = payload.id;
      } catch (e) {}

      const res = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${trip.name} (Copy)`,
          description: trip.description,
          startDate: trip.startDate,
          endDate: trip.endDate,
          userId: userId
        })
      });

      if (res.ok) {
        const newTrip = await res.json();
        router.push(`/trips/${newTrip.id}/builder`);
      } else {
        alert("Failed to copy trip");
      }
    } catch (err) {
      console.error("Copy error:", err);
    } finally {
      setIsCloning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Trip Not Found</h2>
        <button onClick={() => router.back()} className="glass-button px-6 py-2">Go Back</button>
      </div>
    );
  }

  const tripImage = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop";
  const startDate = new Date(trip.startDate).toLocaleDateString();
  const endDate = new Date(trip.endDate).toLocaleDateString();

  return (
    <div className="min-h-screen bg-[#0F0A07] text-white selection:bg-primary-500/30 pb-20">
      {/* Top Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A07] via-transparent to-transparent z-10" />
        <img 
          src={tripImage} 
          alt={trip.name} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">{trip.name}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-white">
                  {trip.user?.name?.charAt(0) || "U"}
                </div>
                <span className="font-medium">Curated by {trip.user?.name || "Traveler"}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{startDate} - {endDate}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8">
        {/* Action Bar */}
        <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 sticky top-4 z-40">
          <button 
            onClick={handleCopyTrip}
            disabled={isCloning}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(160,114,75,0.3)] transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            {isCloning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Copy className="w-5 h-5" />}
            Copy This Trip
          </button>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none p-3 glass-button text-white/70 hover:text-[#25D366] group" title="Share on WhatsApp">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="flex-1 sm:flex-none p-3 glass-button text-white/70 hover:text-[#1DA1F2] group" title="Share on Twitter">
              <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="flex-1 sm:flex-none p-3 glass-button text-white/70 hover:text-white group" title="Copy Link">
              <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {trip.stops?.length > 0 ? (
            trip.stops.map((stop: any, index: number) => (
              <motion.div 
                key={stop.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-3 text-left md:text-right mb-6 md:mb-0 relative">
                    <div className="absolute left-[-32px] md:left-auto md:right-[-25px] top-2 w-4 h-4 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(160,114,75,0.8)] z-10 border-2 border-[#0F0A07]" />
                    <h3 className="text-2xl font-heading font-bold text-white">Stop {index + 1}</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-primary-300 mt-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {stop.city}
                    </div>
                  </div>
                  
                  <div className="md:col-span-9 space-y-4 md:border-l border-white/10 md:pl-8 relative">
                    <div className="absolute left-[-24px] top-0 bottom-0 w-px bg-white/10 md:hidden" />
                    <div className="glass-card p-5 group hover:bg-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/5 rounded-xl text-primary-400 group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{stop.city}</h4>
                            <p className="text-white/60 text-sm leading-relaxed">{stop.description || "Exploration and sightseeing."}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 text-white/40 italic">
              No itinerary stops added yet.
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-20 py-8 border-t border-white/10 text-center">
        <p className="text-white/40 flex items-center justify-center gap-2">
          Powered by 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 font-heading font-bold text-lg">
            Traveloop
          </span>
        </p>
      </footer>
    </div>
  );
}
