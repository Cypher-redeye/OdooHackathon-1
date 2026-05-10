import React from 'react';

export default function CreateTrip() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-6">Plan a New Trip</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Trip Name</label>
            <input 
              type="text" 
              className="w-full bg-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g., Backpacking Europe"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Start Date</label>
              <input type="date" className="w-full bg-gray-700 rounded-xl px-4 py-3" />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">End Date</label>
              <input type="date" className="w-full bg-gray-700 rounded-xl px-4 py-3" />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea 
              className="w-full bg-gray-700 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="What's the vibe of this trip?"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Cover Photo (Optional)</label>
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-gray-500 cursor-pointer">
              <p className="text-gray-400">Drag and drop an image, or click to browse</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button type="button" className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 font-semibold">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold">Save Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
}