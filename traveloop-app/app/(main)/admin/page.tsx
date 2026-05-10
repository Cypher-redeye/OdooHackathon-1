"use client";

import { motion } from "framer-motion";
import { Users, MapPin, Activity, TrendingUp, Search, Filter, ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const MONTHLY_USERS = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 5000 },
  { name: 'Mar', users: 6500 },
  { name: 'Apr', users: 8000 },
  { name: 'May', users: 11000 },
  { name: 'Jun', users: 15000 },
];

const PIE_DATA = [
  { name: 'Europe', value: 45, color: '#A0724B' },
  { name: 'Asia', value: 30, color: '#8B6914' },
  { name: 'Americas', value: 15, color: '#F59E0B' },
  { name: 'Others', value: 10, color: '#2D6A4F' },
];

const POPULAR_DESTINATIONS = [
  { rank: 1, city: "Paris, France", count: 12450 },
  { rank: 2, city: "Bali, Indonesia", count: 9800 },
  { rank: 3, city: "Tokyo, Japan", count: 8500 },
  { rank: 4, city: "Rome, Italy", count: 7200 },
];

const STATS = [
  { label: "Total Users", value: "145.2K", icon: Users, color: "text-primary-400" },
  { label: "Active Trips", value: "32.4K", icon: Activity, color: "text-accent-teal" },
  { label: "Destinations", value: "1,204", icon: MapPin, color: "text-accent-amber" },
  { label: "Revenue", value: "$42.5K", icon: TrendingUp, color: "text-primary-300" },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Manage users, view analytics and track platform usage.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search users, trips, or destinations..." 
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

      {/* Sub Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {["Overview", "Manage Users", "Popular Places", "Popular Activities", "User Trends and Analytics"].map((tab, i) => (
          <button
            key={tab}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
              i === 0
                ? 'bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-500/20'
                : 'glass-button text-white/70 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-white/5 rounded-xl border border-white/10 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="glass-card p-6 lg:col-span-2 flex flex-col h-[400px]">
          <h3 className="text-xl font-heading font-bold text-white mb-6">User Growth (Last 6 Months)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_USERS}>
                <XAxis dataKey="name" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A120D', borderColor: '#ffffff20', borderRadius: '12px' }}
                  cursor={{ stroke: '#ffffff20', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="users" stroke="#A0724B" strokeWidth={4} dot={{ fill: '#A0724B', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#F5C842' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="glass-card p-6 flex flex-col h-[400px]">
          <h3 className="text-xl font-heading font-bold text-white mb-6">Trips by Region</h3>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A120D', borderColor: '#ffffff20', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {PIE_DATA.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-white/70">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Destinations List */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-heading font-bold text-white">Popular Destinations</h3>
          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">View All</button>
        </div>
        <div className="divide-y divide-white/5">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div key={dest.rank} className="p-4 px-6 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary-300">
                  {dest.rank}
                </div>
                <span className="font-medium text-white">{dest.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">{dest.count.toLocaleString()} trips</span>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-600 to-accent-amber rounded-full" 
                    style={{ width: `${(dest.count / POPULAR_DESTINATIONS[0].count) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
