"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Globe, Edit2, Camera, Shield, Bell, Moon, LogOut, Plane } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const TRAVEL_STATS = [
  { label: "Trips Planned", value: "12", icon: Plane },
  { label: "Countries", value: "8", icon: Globe },
  { label: "Cities Explored", value: "24", icon: MapPin },
  { label: "Member Since", value: "2024", icon: Calendar },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-card overflow-hidden"
      >
        {/* Cover Banner */}
        <div className="h-40 bg-gradient-to-r from-primary-600 via-primary-800 to-primary-950 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          <button className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white/70 hover:text-white transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-3xl font-heading font-bold text-white border-4 border-[#0F0A07] shadow-xl">
                T
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center text-white hover:bg-primary-400 transition-colors shadow-lg">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold text-white">Traveler</h1>
              <p className="text-white/60 text-sm">traveler@traveloop.com</p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 glass-button text-sm font-medium text-white flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {TRAVEL_STATS.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants} className="glass-card p-4 text-center">
            <stat.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/60 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Details */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Personal Info */}
        <motion.div variants={itemVariants} className="glass-card p-6 space-y-5">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-primary-400" />
            Personal Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider font-medium">Full Name</label>
              <input
                type="text"
                defaultValue="Traveler"
                disabled={!isEditing}
                className="w-full glass-input mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider font-medium">Email</label>
              <input
                type="email"
                defaultValue="traveler@traveloop.com"
                disabled={!isEditing}
                className="w-full glass-input mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider font-medium">Location</label>
              <input
                type="text"
                defaultValue="Worldwide Explorer"
                disabled={!isEditing}
                className="w-full glass-input mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </motion.div>

        {/* Preferences & Settings */}
        <motion.div variants={itemVariants} className="glass-card p-6 space-y-5">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-400" />
            Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-sm font-medium text-white">Notifications</p>
                  <p className="text-xs text-white/40">Trip reminders & updates</p>
                </div>
              </div>
              <div className="w-11 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-md" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-sm font-medium text-white">Dark Mode</p>
                  <p className="text-xs text-white/40">Always enabled</p>
                </div>
              </div>
              <div className="w-11 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-md" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-sm font-medium text-white">Currency</p>
                  <p className="text-xs text-white/40">USD ($)</p>
                </div>
              </div>
              <span className="text-sm text-primary-400 font-medium cursor-pointer hover:text-primary-300">Change</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="w-full py-3 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
