"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Sparkles, AlertCircle } from "lucide-react";

const PIE_DATA = [
  { name: 'Transport', value: 800, color: '#4F46E5' },
  { name: 'Stay', value: 1200, color: '#7C3AED' },
  { name: 'Activities', value: 400, color: '#F59E0B' },
  { name: 'Meals', value: 600, color: '#0D9488' },
];

const BAR_DATA = [
  { day: 'Day 1', cost: 150 },
  { day: 'Day 2', cost: 300 },
  { day: 'Day 3', cost: 200 },
  { day: 'Day 4', cost: 400 },
  { day: 'Day 5', cost: 250 },
];

export default function BudgetPage({ params }: { params: { id: string } }) {
  const totalBudget = 3000;
  const totalSpent = 2400; // Mock data
  const percentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header & Total Budget */}
      <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Budget Overview</h1>
          <p className="text-white/60">Track your spending for Summer in Kyoto</p>
        </div>
        <div className="glass-card p-6 min-w-[250px] text-center shadow-[0_0_30px_rgba(124,58,237,0.2)]">
          <p className="text-sm font-medium text-white/60 mb-1">Total Estimated Cost</p>
          <motion.h2 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600"
          >
            $3,000
          </motion.h2>
        </div>
      </div>

      {/* Health Bar */}
      <div className="glass-card p-6">
        <div className="flex justify-between text-sm font-medium text-white mb-2">
          <span>Spent: ${totalSpent}</span>
          <span className="text-primary-400">Remaining: ${totalBudget - totalSpent}</span>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full rounded-full ${
              percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-accent-amber' : 'bg-accent-teal'
            }`}
          />
        </div>
      </div>

      {/* AI Insight */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-900/30 border border-primary-500/30 rounded-2xl p-5 flex items-start gap-4 shadow-lg shadow-primary-500/10"
      >
        <div className="p-2 bg-primary-500/20 text-primary-400 rounded-lg shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-white mb-1">AI Insight</h4>
          <p className="text-white/80 text-sm leading-relaxed">
            Your accommodation cost is 40% above average for this region. Consider booking stays a bit further from the city center to save an estimated $300.
          </p>
        </div>
      </motion.div>

      {/* Alert Banner */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-400" />
        <p className="text-sm font-medium text-red-200">Day 4 exceeds your daily average budget by $150.</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col h-[400px]">
          <h3 className="text-xl font-heading font-bold text-white mb-6">Category Breakdown</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131127', borderColor: '#ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col h-[400px]">
          <h3 className="text-xl font-heading font-bold text-white mb-6">Daily Spending</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA}>
                <XAxis dataKey="day" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131127', borderColor: '#ffffff20', borderRadius: '12px' }}
                  cursor={{ fill: '#ffffff10' }}
                />
                <Bar dataKey="cost" fill="#7C3AED" radius={[4, 4, 0, 0]}>
                  {BAR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cost > 300 ? '#F59E0B' : '#7C3AED'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
