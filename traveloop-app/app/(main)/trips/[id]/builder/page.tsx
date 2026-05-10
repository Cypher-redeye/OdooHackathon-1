"use client";

import { API_URL } from "@/lib/api";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Calendar, GripVertical, Plus, Trash2, Clock, 
  DollarSign, X, Loader2, Activity as ActivityIcon 
} from "lucide-react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableStop({ stop, activeStopId, setActiveStopId, handleDeleteStop }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: stop.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass-card p-4 cursor-pointer transition-all border-l-4 group relative ${
        activeStopId === stop.id 
          ? 'border-l-primary-500 bg-white/10' 
          : 'border-l-transparent hover:bg-white/5'
      }`}
      onClick={() => setActiveStopId(stop.id)}
    >
      <div className="flex items-center gap-3">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 text-white/20 hover:text-white/40"
        >
          <GripVertical className="w-5 h-5" />
        </div>
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
            <span className="flex items-center gap-1"><ActivityIcon className="w-3.5 h-3.5" /> {stop.activities?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryBuilderPage({ params }: { params: { id: string } }) {
  const [stops, setStops] = useState<any[]>([]);
  const [activeStopId, setActiveStopId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Activity states
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [actName, setActName] = useState("");
  const [actCost, setActCost] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/trips/${params.id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const trip = await res.json();
        setStops(trip.stops || []);
        if (trip.stops?.length > 0 && !activeStopId) setActiveStopId(trip.stops[0].id);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [params.id]);

  const activeStop = stops.find(s => s.id === activeStopId);

  const handleAddStop = async () => {
    if (!newCity || !newStartDate || !newEndDate) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/stops`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
        setStops([...stops, { ...stop, activities: [] }]);
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
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/stops/${stopId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const newStops = stops.filter(s => s.id !== stopId);
        setStops(newStops);
        if (activeStopId === stopId) setActiveStopId(newStops.length > 0 ? newStops[0].id : null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = stops.findIndex((s) => s.id === active.id);
      const newIndex = stops.findIndex((s) => s.id === over.id);
      
      const newStops = arrayMove(stops, oldIndex, newIndex);
      setStops(newStops);
      
      try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/api/stops/reorder`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            stops: newStops.map((s, idx) => ({ id: s.id, order: idx + 1 }))
          })
        });
      } catch (err) {
        console.error("Reorder save error:", err);
      }
    }
  };

  const handleAddActivity = async () => {
    if (!actName || !actCost || !activeStopId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/activities`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: actName,
          cost: parseFloat(actCost),
          stopId: activeStopId
        })
      });
      if (res.ok) {
        const activity = await res.json();
        setStops(stops.map(s => s.id === activeStopId ? { ...s, activities: [...(s.activities || []), activity] } : s));
        setActName("");
        setActCost("");
        setIsAddingActivity(false);
      }
    } catch (err) {
      console.error("Add activity error:", err);
    }
  };

  const handleDeleteActivity = async (actId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/activities/${actId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setStops(stops.map(s => s.id === activeStopId ? { ...s, activities: s.activities.filter((a: any) => a.id !== actId) } : s));
      }
    } catch (err) {
      console.error("Delete activity error:", err);
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
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={stops.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {stops.map((stop) => (
                    <SortableStop 
                      key={stop.id} 
                      stop={stop} 
                      activeStopId={activeStopId} 
                      setActiveStopId={setActiveStopId} 
                      handleDeleteStop={handleDeleteStop}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      <div className="w-full md:w-[65%] flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        {activeStop ? (
          <>
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary-900/40 to-transparent">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-white mb-2">{activeStop.city}</h2>
                  <div className="text-white/60 mb-4">{activeStop.description}</div>
                  <div className="flex items-center gap-4 text-primary-300 font-medium">
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(activeStop.startDate).toLocaleDateString()} - {new Date(activeStop.endDate).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1.5 text-accent-amber"><DollarSign className="w-4 h-4" /> Total: ${activeStop.activities?.reduce((acc: number, a: any) => acc + a.cost, 0).toLocaleString()}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAddingActivity(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary-600/20"
                >
                  <Plus className="w-4 h-4" /> Add Activity
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {activeStop.activities?.length > 0 ? (
                <div className="space-y-3">
                  {activeStop.activities.map((activity: any) => (
                    <motion.div 
                      key={activity.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl group hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400">
                          <ActivityIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{activity.name}</h4>
                          <span className="text-sm text-white/40 flex items-center gap-1"><DollarSign className="w-3 h-3" /> {activity.cost}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/40 py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                  <ActivityIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold text-white/60">No activities planned yet</p>
                  <p className="text-sm mt-1">Start adding things to do in {activeStop.city}!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            Select a stop to view details
          </div>
        )}
      </div>

      {/* Add Stop Drawer */}
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

      {/* Add Activity Modal */}
      <AnimatePresence>
        {isAddingActivity && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#1A120D] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-heading">Add Activity</h2>
                <button onClick={() => setIsAddingActivity(false)} className="text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 mb-1 block">Activity Name</label>
                  <input type="text" value={actName} onChange={e => setActName(e.target.value)} className="w-full glass-input" placeholder="e.g., Museum Visit" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 mb-1 block">Cost ($)</label>
                  <input type="number" value={actCost} onChange={e => setActCost(e.target.value)} className="w-full glass-input" placeholder="0.00" />
                </div>
                <button 
                  onClick={handleAddActivity} 
                  className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium mt-4 shadow-lg shadow-primary-600/20"
                >
                  Save Activity
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
