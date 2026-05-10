import React from 'react';

export default function Dashboard() {
  const recentTrips = [
    { id: 1, name: "Euro Summer 2026", dates: "Jun 10 - Jun 25", destinations: 3 },
    { id: 2, name: "Tokyo Drift", dates: "Oct 5 - Oct 15", destinations: 1 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Hello, Traveler! 👋</h1>
            <p className="text-gray-400 mt-2">Ready for your next adventure?</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
            + Plan New Trip
          </button>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Upcoming Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTrips.map(trip => (
              <div key={trip.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition cursor-pointer">
                <h3 className="text-xl font-bold mb-2">{trip.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{trip.dates} • {trip.destinations} Destinations</p>
                <div className="flex gap-2">
                  <button className="text-sm bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600">View</button>
                  <button className="text-sm bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}