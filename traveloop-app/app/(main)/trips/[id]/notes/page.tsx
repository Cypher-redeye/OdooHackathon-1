"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, Plus, Calendar, MapPin, ChevronDown, Trash2, X, Loader2 } from "lucide-react";

export default function TripNotesPage({ params }: { params: { id: string } }) {
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:5000/api/notes/${params.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setNotes(await res.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [params.id]);

  const handleAddNote = async () => {
    if (!newTitle || !newContent) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5000/api/notes", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, content: newContent, category: "General", tripId: params.id })
      });
      if (res.ok) {
        const note = await res.json();
        setNotes([note, ...notes]);
        setIsModalOpen(false);
        setNewTitle("");
        setNewContent("");
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setNotes(notes.filter(n => n.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(query.toLowerCase()) || 
    note.content.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-400" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Trip Notes & Journal</h1>
          <p className="text-white/60">Capture your memories and important details.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(160,114,75,0.3)] transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Note
        </button>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass-input pl-10 py-2.5"
          />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div 
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card overflow-hidden"
            >
              <div 
                className="p-5 flex items-start justify-between cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedId(expandedId === note.id ? null : note.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-bold px-2 py-1 bg-primary-900/50 text-primary-300 rounded border border-primary-500/30">
                      {note.category}
                    </span>
                    <span className="text-xs flex items-center gap-1 text-white/50">
                      <Calendar className="w-3 h-3" /> {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white pr-4">{note.title}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <motion.div
                    animate={{ rotate: expandedId === note.id ? 180 : 0 }}
                    className="p-2 text-white/50"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedId === note.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-white/5 mt-2 bg-white/[0.02]">
                      <p className="text-white/80 leading-relaxed text-sm mt-4 whitespace-pre-wrap">
                        {note.content}
                      </p>
                      
                      <div className="flex justify-end gap-3 mt-6">
                        <button 
                          onClick={() => handleDeleteNote(note.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredNotes.length === 0 && (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No notes found</h3>
            <p className="text-white/50">Try adding a new note to start your journal.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-[#1A120D] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-heading">Add Note</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Title</label>
                  <input 
                    type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} 
                    className="w-full glass-input" placeholder="Note title..."
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Content</label>
                  <textarea 
                    value={newContent} onChange={e => setNewContent(e.target.value)} 
                    className="w-full glass-input min-h-[120px] resize-none" placeholder="Write your note here..."
                  />
                </div>
                <button 
                  onClick={handleAddNote} 
                  className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium mt-4"
                >
                  Save Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
