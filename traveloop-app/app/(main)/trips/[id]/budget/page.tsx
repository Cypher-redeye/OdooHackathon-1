"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, PieChart, TrendingDown, Plus, Wallet, ShoppingBag, Utensils, Plane, Loader2, X } from "lucide-react";
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ItineraryBudgetPage({ params }: { params: { id: string } }) {
  const [budget, setBudget] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Transport");

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/budget/${params.id}`);
        if (res.ok) setBudget(await res.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBudget();
  }, [params.id]);

  const handleAddExpense = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const updatedBudget = { ...budget };
    const key = category.toLowerCase();
    updatedBudget[key] = (updatedBudget[key] || 0) + val;

    try {
      const res = await fetch(`http://localhost:5000/api/budget/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(160,114,75,0.3)] transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-primary-900/40 to-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-500/20 rounded-xl text-primary-400">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-white/60 uppercase tracking-wider">Total Spent</span>
            </div>
            <div className="text-4xl font-heading font-bold text-white">${totalSpent.toLocaleString()}</div>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-6">Breakdown</h3>
            <div className="space-y-6">
              {[
                { name: 'Transport', value: budget.transport, icon: Plane },
                { name: 'Accommodation', value: budget.stay, icon: Plane },
                { name: 'Food & Dining', value: budget.meals, icon: Utensils },
                { name: 'Activities', value: budget.activities, icon: Plane },
              ].map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-white/40"><cat.icon className="w-4 h-4" /></div>
                    <span className="text-white/80">{cat.name}</span>
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
                  <Pie data={chartData} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1A120D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                </RePie>
              </ResponsiveContainer>
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
