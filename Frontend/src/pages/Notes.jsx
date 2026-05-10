import React from 'react';

export default function Notes() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Trip Journal</h1>
        <p className="text-gray-400 mb-8">Euro Summer 2026</p>

        <div className="mb-8">
          <textarea 
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-4 h-32 focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write a new note, reminder, or journal entry..."
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold">Save Note</button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold bg-gray-700 px-3 py-1 rounded-full text-gray-300">Paris • Day 1</span>
              <span className="text-sm text-gray-500">June 10, 2026 - 4:30 PM</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              The Airbnb host code is 4829#. Need to grab groceries from the Monoprix down the street before it closes at 9 PM.
            </p>
            <div className="flex justify-end mt-4 gap-4">
              <button className="text-sm text-gray-500 hover:text-blue-400">Edit</button>
              <button className="text-sm text-gray-500 hover:text-red-400">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}