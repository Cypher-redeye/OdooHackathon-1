"use client";

import { motion } from "framer-motion";
import { Share2, Link as LinkIcon, Twitter, Copy, MapPin, Calendar, Clock, DollarSign } from "lucide-react";

// Mock data
const PUBLIC_TRIP = {
  name: "Summer in Kyoto",
  owner: "Traveler",
  avatar: "T",
  dates: "Jul 10 - Jul 24",
  image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
  days: [
    {
      id: "day1",
      date: "Jul 10",
      city: "Kyoto",
      activities: [
        { id: "a1", name: "Fushimi Inari Taisha", time: "09:00 AM", duration: "3h", cost: "Free", category: "Sightseeing", icon: MapPin },
        { id: "a2", name: "Lunch at Nishiki Market", time: "12:30 PM", duration: "1.5h", cost: "$30", category: "Food", icon: DollarSign },
      ]
    },
    {
      id: "day2",
      date: "Jul 11",
      city: "Kyoto",
      activities: [
        { id: "a3", name: "Arashiyama Bamboo Grove", time: "08:00 AM", duration: "4h", cost: "$10", category: "Sightseeing", icon: MapPin },
      ]
    }
  ]
};

export default function PublicItineraryPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-white selection:bg-primary-500/30 pb-20">
      {/* Top Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent z-10" />
        <img 
          src={PUBLIC_TRIP.image} 
          alt={PUBLIC_TRIP.name} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">{PUBLIC_TRIP.name}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-white">
                  {PUBLIC_TRIP.avatar}
                </div>
                <span className="font-medium">Curated by {PUBLIC_TRIP.owner}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{PUBLIC_TRIP.dates}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8">
        {/* Action Bar */}
        <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 sticky top-4 z-40">
          <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2 hover:scale-105">
            <Copy className="w-5 h-5" />
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
          {PUBLIC_TRIP.days.map((day, index) => (
            <motion.div 
              key={day.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-12 gap-8 items-start">
                {/* Date Header (Left col on desktop, top on mobile) */}
                <div className="md:col-span-3 text-left md:text-right mb-6 md:mb-0 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-[-32px] md:left-auto md:right-[-25px] top-2 w-4 h-4 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(124,58,237,0.8)] z-10 border-2 border-[#0f0c29]" />
                  
                  <h3 className="text-2xl font-heading font-bold text-white">{day.date}</h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-primary-300 mt-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {day.city}
                  </div>
                </div>
                
                {/* Activities (Right col on desktop) */}
                <div className="md:col-span-9 space-y-4 md:border-l border-white/10 md:pl-8 relative">
                  {/* Mobile timeline line */}
                  <div className="absolute left-[-24px] top-0 bottom-0 w-px bg-white/10 md:hidden" />
                  
                  {day.activities.map((act) => (
                    <div key={act.id} className="glass-card p-5 group hover:bg-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/5 rounded-xl text-primary-400 group-hover:scale-110 transition-transform">
                            <act.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{act.name}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {act.time} ({act.duration})</span>
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-white/80"><DollarSign className="w-3.5 h-3.5" /> {act.cost}</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-primary-500/20 text-primary-300 border border-primary-500/30 rounded-lg text-sm font-bold w-fit">
                          {act.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
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
