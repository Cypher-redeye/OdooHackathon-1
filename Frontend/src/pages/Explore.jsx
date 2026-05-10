import React from 'react';

export default function Explore() {
  const cities = [
    { name: "Kyoto", country: "Japan", cost: "$$$", tags: ["Culture", "Nature"] },
    { name: "Lisbon", country: "Portugal", cost: "$$", tags: ["Food", "Architecture"] }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Explore Destinations</h1>
        <p className="text-gray-400 mb-8">Find cities and activities to add to your itinerary.</p>

        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search cities, countries, or activities..." 
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">Search</button>
        </div>

        <div className="flex gap-2 mb-6">
          <span className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-700">Region: Europe</span>
          <span className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-700">Budget: Under $100/day</span>
          <span className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-700">Vibe: Adventure</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, idx) => (
            <div key={idx} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition">
              <div className="h-40 bg-gray-700 flex items-center justify-center text-gray-500">Image Placeholder</div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-gray-400 text-sm">{city.country}</p>
                  </div>
                  <span className="text-green-400 font-semibold">{city.cost}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  {city.tags.map(tag => (
                    <span key={tag} className="bg-gray-900 text-xs px-2 py-1 rounded-md text-gray-300">{tag}</span>
                  ))}
                </div>
                <button className="w-full mt-6 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-semibold transition">
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}