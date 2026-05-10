"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, MapPin, Calendar, Globe, Edit2, Camera, 
  Shield, Bell, Moon, LogOut, Plane, Heart, Award, Briefcase, 
  RefreshCcw, Phone, CreditCard, ShieldCheck, LifeBuoy
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("No session found. Please sign in.");
      setIsLoading(false);
      return;
    }

    try {
      // Try 127.0.0.1 to avoid localhost IPv6 resolution issues on Windows
      const res = await fetch("http://127.0.0.1:5000/api/auth/me", {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      const data = await res.json().catch(() => null);

      if (res.ok && data) {
        setUser(data);
      } else {
        const errorMsg = data?.error || `Error ${res.status}: Could not load profile.`;
        setError(errorMsg);
        
        // If it's a 401 or 404 (user deleted), the session is invalid
        if (res.status === 401 || res.status === 404) {
          localStorage.removeItem("token");
          setError("Your session has expired. Please sign in again.");
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error: Could not reach the travel server. Please check if the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/profile", {
          method: "PATCH",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ image: base64 })
        });
        if (res.ok) {
          const updatedUser = await res.json();
          setUser((prev: any) => ({ ...prev, image: updatedUser.image }));
          // Update cached username if needed, but image is what matters here
        }
      } catch (err) {
        console.error("Upload error:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/60">
        <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
        <p className="font-medium animate-pulse tracking-wide">Contacting the Global Registry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
          <Shield className="w-12 h-12 text-red-400 relative z-10" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Passport Issue</h2>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">{error}</p>
        <div className="flex flex-col sm:flex-row gap-5 w-full">
          <button 
            onClick={() => router.push("/auth")}
            className="flex-1 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-primary-600/20"
          >
            Re-authenticate
          </button>
          <button 
            onClick={fetchUser}
            className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            Check Again
          </button>
        </div>
      </div>
    );
  }

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "May 2024";

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Immersive Header */}
        <div className="relative">
          <div className="h-72 rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-800 to-primary-950 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-primary-400/10 rounded-full blur-[120px]" 
            />
          </div>

          <div className="absolute -bottom-16 left-12 flex flex-col md:flex-row items-end gap-8 px-4 z-20">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] bg-[#0F0A07] p-1.5 shadow-2xl overflow-hidden">
                <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-5xl font-heading font-bold text-white relative overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.[0].toUpperCase() || "T"
                  )}
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-primary-500 hover:bg-primary-400 text-white rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-5xl font-heading font-bold text-white flex items-center gap-4">
                {user?.name || "Premium Traveler"}
                <div className="px-3 py-1 bg-accent-amber/20 text-accent-amber rounded-full text-xs font-bold uppercase tracking-widest border border-accent-amber/30">
                  Elite Member
                </div>
              </h1>
              <div className="flex flex-wrap items-center gap-6 mt-3 text-white/70">
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full"><MapPin className="w-4 h-4 text-primary-400" /> New York, USA</span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 text-primary-400" /> Explorer since {joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-36 relative z-10">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card p-10 space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-heading font-bold text-white flex items-center gap-4">
                  <User className="w-8 h-8 text-primary-400" />
                  Traveler Profile
                </h2>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                    isEditing 
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30" 
                    : "bg-white/5 text-primary-400 hover:bg-white/10"
                  }`}
                >
                  <Edit2 className="w-5 h-5" />
                  {isEditing ? "Save Profile" : "Edit Details"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-primary-500/30 transition-all">
                    <User className="w-5 h-5 text-primary-400" />
                    <input 
                      type="text" 
                      defaultValue={user?.name} 
                      disabled={!isEditing}
                      className="bg-transparent border-none focus:ring-0 text-white font-medium w-full disabled:opacity-80"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Communication</label>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-primary-500/30 transition-all">
                    <Mail className="w-5 h-5 text-primary-400" />
                    <input 
                      type="email" 
                      defaultValue={user?.email} 
                      disabled={!isEditing}
                      className="bg-transparent border-none focus:ring-0 text-white font-medium w-full disabled:opacity-80"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-primary-500/30 transition-all">
                    <Phone className="w-5 h-5 text-primary-400" />
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      disabled={!isEditing}
                      className="bg-transparent border-none focus:ring-0 text-white font-medium w-full disabled:opacity-80"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Passport Number</label>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-primary-500/30 transition-all">
                    <CreditCard className="w-5 h-5 text-primary-400" />
                    <input 
                      type="text" 
                      placeholder="X12345678"
                      disabled={!isEditing}
                      className="bg-transparent border-none focus:ring-0 text-white font-medium w-full disabled:opacity-80 uppercase tracking-widest"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Explorer Biography</label>
                <textarea 
                  disabled={!isEditing}
                  rows={3}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-white/80 italic leading-relaxed focus:ring-1 focus:ring-primary-500/50 focus:bg-white/10 transition-all disabled:opacity-80"
                  defaultValue="Passionate traveler and mountain hiker. I believe every city has a story to tell, and I'm here to read them all. Traveloop helps me keep my adventures organized so I can focus on the experience."
                />
              </div>

              <div className="pt-6 border-t border-white/5">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-3 mb-6">
                  <LifeBuoy className="w-5 h-5 text-red-400" />
                  Emergency Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Contact Name</p>
                    <p className="text-white font-medium">Jane Doe (Sister)</p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Emergency Phone</p>
                    <p className="text-white font-medium">+1 (555) 999-8888</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8 text-primary-400" />
                </div>
                <h4 className="text-white font-bold mb-1">Verified Member</h4>
                <p className="text-xs text-white/40">Identity confirmed via Traveloop Trust</p>
              </div>
              <div className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-accent-amber/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-accent-amber" />
                </div>
                <h4 className="text-white font-bold mb-1">Trailblazer Badge</h4>
                <p className="text-xs text-white/40">Planned 5+ successful expeditions</p>
              </div>
              <div className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-accent-teal/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-accent-teal" />
                </div>
                <h4 className="text-white font-bold mb-1">Top Contributor</h4>
                <p className="text-xs text-white/40">Added 10+ activities to the community</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 bg-gradient-to-br from-primary-900/40 to-transparent border-primary-500/20">
              <h3 className="text-xl font-heading font-bold text-white mb-6">Travel Summary</h3>
              <div className="space-y-6">
                {[
                  { label: "Total Expeditions", val: user?.stats?.tripsPlanned || "0", icon: Plane, color: "text-blue-400" },
                  { label: "Cities Reached", val: "12", icon: MapPin, color: "text-red-400" },
                  { label: "Countries Stamped", val: "5", icon: Globe, color: "text-accent-teal" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="text-sm text-white/60 font-medium">{stat.label}</span>
                    </div>
                    <span className="text-xl font-heading font-bold text-white">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 space-y-6">
              <h3 className="text-xl font-heading font-bold text-white">Travel Preferences</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-medium text-white">Digital Nomad</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary-400 uppercase">Primary</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-accent-teal" />
                    <span className="text-sm font-medium text-white">English, French</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 space-y-6 border-red-500/10">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <Shield className="w-5 h-5" />
                <h3 className="text-lg font-bold">Account Security</h3>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-all hover:gap-5"
              >
                <LogOut className="w-5 h-5" />
                Secure Sign Out
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
