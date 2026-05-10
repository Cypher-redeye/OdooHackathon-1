import React from 'react';

export default function PackingChecklist() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Packing List</h1>
            <p className="text-gray-400">Euro Summer 2026 • 24 Items Total</p>
          </div>
          <button className="text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg text-sm">
            Reset List
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-400">Documents</h2>
            <span className="text-sm text-gray-400">1 / 3 Packed</span>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
              <span className="line-through text-gray-500">Passport</span>
            </label>
            <label className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
              <span>Travel Insurance Printout</span>
            </label>
            <label className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
              <span>Boarding Passes</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add new item..." 
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
          <select className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-300 focus:ring-2 focus:ring-blue-500">
            <option>Documents</option>
            <option>Clothing</option>
            <option>Electronics</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">Add</button>
        </div>
      </div>
    </div>
  );
}