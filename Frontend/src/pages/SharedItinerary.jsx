import React from 'react';

export default function SharedItinerary() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Public Banner */}
        <div className="bg-blue-900/30 border border-blue-500/50 text-blue-200 px-4 py-3 rounded-xl flex justify-between items-center mb-8">
          <p className="text-sm">You are viewing a shared itinerary created by <strong>Jane Doe</strong>.</p>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Copy Trip
            </button>
          </div>
        </div>

        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Tokyo Drift</h1>
          <p className="text-xl text-gray-400">October 5 - October 15, 2026</p>
          <div className="flex justify-center gap-4 mt-6">
            <span className="bg-gray-800 px-4 py-2 rounded-full text-sm border border-gray-700">10 Days</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full text-sm border border-gray-700">3 Cities</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full text-sm border border-gray-700">Budget: $$</span>
          </div>
        </header>

        {/* Read-Only Timeline */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Day 1: Arrival in Tokyo</h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="text-blue-400 font-bold w-20">14:00</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-white">Land at Narita Airport</h4>
                  <p className="text-gray-400 text-sm">Take the Narita Express to Shibuya Station.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="text-blue-400 font-bold w-20">19:00</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-white">Dinner at Ichiran Ramen</h4>
                  <p className="text-gray-400 text-sm">Classic tonkotsu ramen experience.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}