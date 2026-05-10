"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, CheckSquare, Square, Plus, Trash2, Loader2 } from "lucide-react";

const CATEGORY_LIST = ["Documents", "Clothing", "Electronics", "Toiletries", "Miscellaneous"];

export default function PackingChecklistPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [newItemText, setNewItemText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:5000/api/packing/${params.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setItems(await res.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [params.id]);

  const toggleItem = async (itemId: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:5000/api/packing/${itemId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ packed: !currentStatus })
      });
      if (res.ok) {
        setItems(items.map(item => item.id === itemId ? { ...item, packed: !currentStatus } : item));
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:5000/api/packing/${itemId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setItems(items.filter(item => item.id !== itemId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const addItem = async (category: string) => {
    const text = newItemText[category];
    if (!text || text.trim() === "") return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5000/api/packing", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: text.trim(), category, tripId: params.id })
      });
      if (res.ok) {
        const item = await res.json();
        setItems([...items, item]);
        setNewItemText({ ...newItemText, [category]: "" });
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const totalItemsCount = items.length;
  const packedItemsCount = items.filter(i => i.packed).length;
  const progress = totalItemsCount === 0 ? 0 : (packedItemsCount / totalItemsCount) * 100;

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-400" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Packing Checklist</h1>
          <p className="text-white/60">Manage your essentials for this trip.</p>
        </div>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search items..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass-input pl-10 py-2.5"
          />
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between text-sm font-medium text-white mb-3">
          <span>Progress: {packedItemsCount}/{totalItemsCount} items packed</span>
          <span className="text-primary-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-600 to-accent-amber rounded-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        {CATEGORY_LIST.map((categoryName) => {
          const categoryItems = items.filter(item => 
            item.category === categoryName && 
            item.name.toLowerCase().includes(query.toLowerCase())
          );
          
          const catPacked = categoryItems.filter(i => i.packed).length;
          
          return (
            <motion.div key={categoryName} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold text-white">{categoryName}</h3>
                <span className="text-sm font-medium text-white/50">{catPacked}/{categoryItems.length}</span>
              </div>
              <div className="p-2">
                <AnimatePresence>
                  {categoryItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
                      onClick={() => toggleItem(item.id, item.packed)}
                    >
                      <div className="flex items-center gap-3">
                        <button className={`text-white transition-colors ${item.packed ? 'text-primary-400' : 'text-white/30 group-hover:text-white/60'}`}>
                          {item.packed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                        </button>
                        <span className={`transition-all ${item.packed ? 'text-white/50 line-through' : 'text-white'}`}>
                          {item.name}
                        </span>
                      </div>
                      <button 
                        className="text-white/20 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all" 
                        onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </AnimatePresence>
                <div className="p-3 mt-2 border-t border-white/5 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add item..." 
                    className="flex-1 glass-input py-1 text-sm"
                    value={newItemText[categoryName] || ""}
                    onChange={(e) => setNewItemText({ ...newItemText, [categoryName]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && addItem(categoryName)}
                  />
                  <button 
                    onClick={() => addItem(categoryName)}
                    className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 text-primary-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex items-center gap-4 pt-4">
        <button 
          onClick={async () => {
            // Bulk update packed status to false
            for (const item of items) {
              if (item.packed) await toggleItem(item.id, true);
            }
          }}
          className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
        >
          Reset all
        </button>
        <button 
          onClick={() => alert("Checklist link copied to clipboard!")}
          className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(160,114,75,0.3)] transition-colors"
        >
          Share Checklist
        </button>
      </div>
    </div>
  );
}
