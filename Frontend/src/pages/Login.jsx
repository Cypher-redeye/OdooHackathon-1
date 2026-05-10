import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Traveloop</h2>
        <p className="text-gray-400 mb-8">Plan your next adventure with ease.</p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">Forgot Password?</a>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200">
            Login
          </button>
        </form>

        <div className="mt-8 flex items-center">
          <div className="flex-1 border-b border-gray-700"></div>
          <p className="text-gray-400 px-4 text-sm">or continue with</p>
          <div className="flex-1 border-b border-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="border border-gray-700 rounded-xl py-3 text-white hover:bg-gray-700 transition">Google</button>
          <button className="border border-gray-700 rounded-xl py-3 text-white hover:bg-gray-700 transition">GitHub</button>
        </div>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
        </p>
      </div>
    </div>
  );
}