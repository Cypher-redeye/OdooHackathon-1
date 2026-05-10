import React from 'react';

export default function Budget() {
  // Example of an over-budget alert logic
  const isOverBudget = false;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Trip Budget Dashboard</h1>

        {/* Over Budget Alert [cite: 72] */}
        {isOverBudget && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-xl mb-8">
            <strong>Warning:</strong> You have exceeded your daily budget for some days!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <p className="text-gray-400 mb-1">Total Estimated</p>
            <h2 className="text-4xl font-bold text-blue-400">$3,250</h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <p className="text-gray-400 mb-1">Spent So Far</p>
            <h2 className="text-4xl font-bold text-green-400">$1,100</h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <p className="text-gray-400 mb-1">Remaining</p>
            <h2 className="text-4xl font-bold text-yellow-400">$2,150</h2>
          </div>
        </div>

        {/* Cost Breakdown by Category [cite: 71] */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-6">Cost Breakdown</h3>
          <div className="space-y-4">
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Flights & Transport</span>
                <span>$1,200</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Accommodation</span>
                <span>$900</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Food & Dining</span>
                <span>$600</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Activities</span>
                <span>$550</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}