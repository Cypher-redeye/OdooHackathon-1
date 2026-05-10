"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, PieChart, TrendingDown, Plus, Wallet, ShoppingBag, Utensils, Plane, Loader2, X, Sparkles, Brain, Lightbulb, ArrowRight } from "lucide-react";
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ItineraryBudgetPage({ params }: { params: { id: string } }) {
  const [budget, setBudget] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isShowingInsights, setIsShowingInsights] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Transport");
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:5000/api/budget/${params.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setBudget(await res.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBudget();
  }, [params.id]);

  const generateInsights = () => {
    setIsGeneratingInsights(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const tips = [];
      const total = budget.transport + budget.stay + budget.meals + budget.activities;
      
      if (total === 0) {
        tips.push("Start by adding your fixed costs like flights and accommodation to get a clear picture of your remaining budget.");
        tips.push("Consider setting a daily spending limit for food and local transport to avoid overspending.");
      } else {
        if (budget.transport > total * 0.4) {
          tips.push("Your transport costs are quite high. Try looking for local rail passes or booking inner-city travel in advance to save up to 30%.");
        }
        if (budget.stay === 0) {
          tips.push("You haven't added accommodation yet. Pro-tip: Booking 'Free Cancellation' stays gives you more flexibility if your plans change.");
        }
        if (budget.meals < total * 0.1 && budget.meals > 0) {
          tips.push("You're spending very little on food! Don't miss out on local specialty restaurants—budgeting an extra $20/day can lead to amazing culinary discoveries.");
        }
        if (budget.activities > total * 0.3) {
          tips.push("Great to see so many activities planned! Check if there's a 'City Pass' available; they often include the activities you've listed at a bundle discount.");
        }
        tips.push("Based on your spending habits, you're on track to stay within a standard traveler budget for this destination.");
      }
      
      setInsights(tips);
      setIsGeneratingInsights(false);
      setIsShowingInsights(true);
    }, 1500);
  };

  const handleAddExpense = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const updatedBudget = { ...budget };
    const key = category.toLowerCase();
    updatedBudget[key] = (updatedBudget[key] || 0) + val;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:5000/api/budget/${params.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedBudget)
      });
      if (res.ok) {
        setBudget(await res.json());
        setAmount("");
        setIsAdding(false);
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-400" /></div>;

  const chartData = [
    { name: 'Transport', value: budget.transport, color: '#A0724B' },
    { name: 'Stay', value: budget.stay, color: '#825D3D' },
    { name: 'Meals', value: budget.meals, color: '#C48B5C' },
    { name: 'Activities', value: budget.activities, color: '#E0C097' },
  ].filter(d => d.value > 0);

  const totalSpent = budget.transport + budget.stay + budget.meals + budget.activities;

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Budget Tracker</h1>
          <p className="text-white/60">Manage your trip expenses efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={generateInsights}
            disabled={isGeneratingInsights}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-all group"
          >
            {isGeneratingInsights ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-primary-400 group-hover:scale-110 transition-transform" />
            )}
            AI Insights
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(160,114,75,0.3)] transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-primary-900/40 to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-20 h-20 rotate-12" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-500/20 rounded-xl text-primary-400">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-white/60 uppercase tracking-wider">Total Spent</span>
            </div>
            <div className="text-4xl font-heading font-bold text-white">${totalSpent.toLocaleString()}</div>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-6 flex items-center justify-between">
              Breakdown
              <PieChart className="w-4 h-4 text-white/20" />
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Transport', value: budget.transport, icon: Plane, color: "bg-primary-400/20" },
                { name: 'Accommodation', value: budget.stay, icon: Home, color: "bg-primary-600/20" },
                { name: 'Food & Dining', value: budget.meals, icon: Utensils, color: "bg-primary-800/20" },
                { name: 'Activities', value: budget.activities, icon: Compass, color: "bg-primary-300/20" },
              ].map((cat) => (
                <div key={cat.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${cat.color} rounded-lg text-white/80 group-hover:scale-110 transition-transform`}><cat.icon className="w-4 h-4" /></div>
                    <span className="text-white/80 group-hover:text-white transition-colors">{cat.name}</span>
                  </div>
                  <span className="font-bold text-white">${cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
          {chartData.length > 0 ? (
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePie>
                  <Pie data={chartData} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value" animationBegin={0} animationDuration={1500}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A120D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </RePie>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                {chartData.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-xs text-white/60">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <PieChart className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No expenses yet</h3>
              <p className="text-white/40 max-w-xs">Start adding your expenses to see a visual breakdown of your trip budget.</p>
            </div>
          )}
        </div>
      </div>

      {/* Insights Modal */}
      <AnimatePresence>
        {isShowingInsights && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#1A120D] border border-primary-500/30 rounded-3xl p-8 w-full max-w-2xl shadow-[0_0_50px_rgba(160,114,75,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary-500/20 rounded-2xl">
                    <Brain className="w-8 h-8 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white font-heading">AI Trip Insights</h2>
                    <p className="text-white/40">Personalized budgeting strategy for you</p>
                  </div>
                </div>
                <button onClick={() => setIsShowingInsights(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                {insights.map((tip, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-primary-500/20 transition-all group"
                  >
                    <div className="mt-1"><Lightbulb className="w-5 h-5 text-accent-amber" /></div>
                    <p className="text-white/80 leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gradient-to-r from-primary-600/20 to-transparent rounded-2xl border border-primary-500/10 flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-1">Estimated Savings</p>
                  <p className="text-2xl font-bold text-white">Save up to $240</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all">
                  Apply Strategy <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#1A120D] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-heading">Add Expense</h2>
                <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Amount ($)</label>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full glass-input" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full glass-input appearance-none bg-[#1A120D]">
                    <option value="Transport">Transport</option>
                    <option value="Stay">Accommodation</option>
                    <option value="Meals">Food & Dining</option>
                    <option value="Activities">Activities</option>
                  </select>
                </div>
                <button onClick={handleAddExpense} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium mt-4">Add Expense</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
