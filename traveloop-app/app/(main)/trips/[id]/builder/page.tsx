"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, GripVertical, Plus, Trash2, Clock, DollarSign, X, Loader2 } from "lucide-react";

export default function ItineraryBuilderPage({ params }: { params: { id: string } }) {
  const [stops, setStops] = useState<any[]>([]);
  const [activeStopId, setActiveStopId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/trips/single/${params.id}`);
        if (res.ok) {
          const trip = await res.json();
          setStops(trip.stops || []);
          if (trip.stops?.length > 0) setActiveStopId(trip.stops[0].id);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStops();
  }, [params.id]);

  const activeStop = stops.find(s => s.id === activeStopId);

  const handleAddStop = async () => {
    if (!newCity || !newStartDate || !newEndDate) return;
    try {
      const res = await fetch("http://localhost:5000/api/stops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: newCity,
          startDate: newStartDate,
          endDate: newEndDate,
          tripId: params.id,
          description: `Exploring ${newCity}`
        })
      });
      if (res.ok) {
        const stop = await res.json();
        setStops([...stops, stop]);
        setActiveStopId(stop.id);
        setIsDrawerOpen(false);
        setNewCity("");
        setNewStartDate("");
        setNewEndDate("");
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleDeleteStop = async (stopId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/stops/${stopId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setStops(stops.filter(s => s.id !== stopId));
        if (activeStopId === stopId) setActiveStopId(stops.find(s => s.id !== stopId)?.id || null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-400" /></div>;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-[35%] flex flex-col gap-4">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full py-3 border border-dashed border-primary-500/50 hover:border-primary-400 bg-primary-500/5 hover:bg-primary-500/10 text-primary-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Stop
        </button>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {stops.length === 0 ? (
             <div className="text-center text-white/40 mt-10">No stops added yet.</div>
          ) : (
            <AnimatePresence>
              {stops.map((stop) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`glass-card p-4 cursor-pointer transition-all border-l-4 group ${
                    activeStopId === stop.id 
                      ? 'border-l-primary-500 bg-white/10' 
                      : 'border-l-transparent hover:bg-white/5'
                  }`}
                  onClick={() => setActiveStopId(stop.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-white text-lg">{stop.city}</h4>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteStop(stop.id); }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-white/20 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(stop.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="w-full md:w-[65%] flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        {activeStop ? (
          <>
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary-900/40 to-transparent">
              <h2 className="text-3xl font-heading font-bold text-white mb-2">{activeStop.city}</h2>
              <div className="text-white/60 mb-4">{activeStop.description}</div>
              <div className="flex items-center gap-2 text-primary-300 font-medium">
                <Calendar className="w-4 h-4" />
                {new Date(activeStop.startDate).toLocaleDateString()} - {new Date(activeStop.endDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-center text-white/40 py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <p>Activity management coming soon.</p>
                <p className="text-sm mt-2">Manage your stops here and plan your daily schedule.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            Select a stop to view details
          </div>
        )}
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1A120D] border-l border-white/10 z-50 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-heading font-bold text-white">Add New Stop</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">City</label>
                  <input type="text" placeholder="e.g., Osaka" className="w-full glass-input" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Dates</label>
                  <div className="flex items-center gap-2">
                    <input type="date" className="w-full glass-input" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />
                    <span className="text-white/40">to</span>
                    <input type="date" className="w-full glass-input" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleAddStop}
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
