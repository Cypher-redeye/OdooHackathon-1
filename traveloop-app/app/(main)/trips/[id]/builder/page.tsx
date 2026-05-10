"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, GripVertical, Plus, Trash2, Clock, DollarSign, X } from "lucide-react";

// Mock Data
const INITIAL_STOPS = [
  { id: "s1", city: "Tokyo", dates: "Jul 10 - Jul 14", activities: [
    { id: "a1", name: "Senso-ji Temple", category: "Sightseeing", cost: "$0", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { id: "a2", name: "Sushi Dai", category: "Food", cost: "$50", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  ]},
  { id: "s2", city: "Kyoto", dates: "Jul 14 - Jul 19", activities: [
    { id: "a3", name: "Fushimi Inari", category: "Sightseeing", cost: "$0", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  ]},
];

export default function ItineraryBuilderPage({ params }: { params: { id: string } }) {
  const [stops, setStops] = useState(INITIAL_STOPS);
  const [activeStopId, setActiveStopId] = useState(INITIAL_STOPS[0].id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeStop = stops.find(s => s.id === activeStopId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Left Panel - Stop List (35%) */}
      <div className="w-full md:w-[35%] flex flex-col gap-4">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full py-3 border border-dashed border-primary-500/50 hover:border-primary-400 bg-primary-500/5 hover:bg-primary-500/10 text-primary-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Stop
        </button>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          <AnimatePresence>
            {stops.map((stop) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`glass-card p-4 cursor-pointer transition-all border-l-4 ${
                  activeStopId === stop.id 
                    ? 'border-l-primary-500 bg-white/10' 
                    : 'border-l-transparent hover:bg-white/5'
                }`}
                onClick={() => setActiveStopId(stop.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-white/40 cursor-grab hover:text-white">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-white text-lg">{stop.city}</h4>
                    <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {stop.dates}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {stop.activities.length}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Stop Detail (65%) */}
      <div className="w-full md:w-[65%] flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        {activeStop ? (
          <>
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary-900/40 to-transparent">
              <h2 className="text-3xl font-heading font-bold text-white mb-2">{activeStop.city}</h2>
              <div className="flex items-center gap-2 text-primary-300 font-medium">
                <Calendar className="w-4 h-4" />
                {activeStop.dates}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {activeStop.activities.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="font-bold text-white mb-2">{activity.name}</h5>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-md border text-xs font-bold ${activity.color}`}>
                          {activity.category}
                        </span>
                        <span className="text-sm text-white/60 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" /> {activity.cost}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button className="w-full py-4 border border-dashed border-white/20 hover:border-white/40 text-white/60 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2 mt-4">
                <Plus className="w-5 h-5" /> Add Activity
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            Select a stop to view details
          </div>
        )}
      </div>

      {/* Slide-in Drawer for Add Stop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#131127] border-l border-white/10 z-50 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-heading font-bold text-white">Add New Stop</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">City</label>
                  <input type="text" placeholder="e.g., Osaka" className="w-full glass-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Dates</label>
                  <div className="flex items-center gap-2">
                    <input type="date" className="w-full glass-input" />
                    <span className="text-white/40">to</span>
                    <input type="date" className="w-full glass-input" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium shadow-lg transition-colors mt-auto"
              >
                Confirm Stop
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
