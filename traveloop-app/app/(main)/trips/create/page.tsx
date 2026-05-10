"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, MapPin, Calendar as CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CreateTripPage() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<string[]>([]);
  const [destInput, setDestInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddDest = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && destInput.trim()) {
      e.preventDefault();
      if (!destinations.includes(destInput.trim())) {
        setDestinations([...destinations, destInput.trim()]);
      }
      setDestInput("");
    }
  };

  const removeDest = (dest: string) => {
    setDestinations(destinations.filter(d => d !== dest));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const inputs = form.querySelectorAll('input');
      const textarea = form.querySelector('textarea');
      
      const name = inputs[0].value;
      const startDate = inputs[1].value;
      const endDate = inputs[2].value;
      const description = textarea?.value || "";

      // Decode token to get user ID
      const token = localStorage.getItem("token");
      let userId = 1; // Fallback
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.id) userId = payload.id;
        } catch (e) {
          console.error("Failed to parse token");
        }
      }

      const response = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          startDate,
          endDate,
          userId,
          destinations
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create trip");
      }

      const trip = await response.json();
      setIsSuccess(true);
      
      setTimeout(() => {
        router.push(`/trips/${trip.id}/builder`);
      }, 1000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Plan a New Trip</h1>
          <p className="text-white/60">Step 1 of 2: Basic Details</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-2 bg-primary-500 rounded-full shadow-[0_0_10px_rgba(160,114,75,0.5)]" />
          <div className="w-10 h-2 bg-white/10 rounded-full" />
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="glass-card p-6 md:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Trip Name</label>
            <input 
              type="text" 
              placeholder="e.g., Summer Eurotrip 2024" 
              className="w-full glass-input text-lg font-medium"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Start Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input type="date" className="w-full glass-input pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">End Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input type="date" className="w-full glass-input pl-10" required />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Trip Description</label>
            <textarea 
              rows={4} 
              placeholder="What's the vibe? Who's going?" 
              className="w-full glass-input resize-none"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Destinations</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text" 
                value={destInput}
                onChange={(e) => setDestInput(e.target.value)}
                onKeyDown={handleAddDest}
                placeholder="Type a city and press Enter" 
                className="w-full glass-input pl-10"
              />
            </div>
            
            {/* Tags area */}
            {destinations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {destinations.map(dest => (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={dest} 
                    className="flex items-center gap-1 bg-primary-600/20 border border-primary-500/30 text-primary-300 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {dest}
                    <button type="button" onClick={() => removeDest(dest)} className="hover:text-white transition-colors p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Cover Photo (Optional)</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <p className="font-medium text-white/80">Click or drag and drop</p>
              <p className="text-sm text-white/40 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-950 hover:from-primary-500 hover:to-primary-800 text-white rounded-xl font-medium text-lg shadow-[0_0_20px_rgba(160,114,75,0.3)] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isSuccess ? (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="flex items-center gap-2 text-accent-teal"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Trip Created!</span>
                </motion.div>
              ) : (
                "Continue to Itinerary"
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
