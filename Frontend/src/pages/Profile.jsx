import React from 'react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-700">
          <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-3xl font-bold text-gray-300">
            JD
          </div>
          <div>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold mb-2">Change Photo</button>
            <p className="text-gray-400 text-sm">JPG, GIF or PNG. Max size 2MB.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">First Name</label>
              <input type="text" defaultValue="Jane" className="w-full bg-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full bg-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input type="email" defaultValue="jane@example.com" className="w-full bg-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Language Preference</label>
            <select className="w-full bg-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <div className="pt-6 border-t border-gray-700 flex justify-between items-center">
            <button type="button" className="text-red-400 hover:text-red-300 font-semibold text-sm">Delete Account</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}