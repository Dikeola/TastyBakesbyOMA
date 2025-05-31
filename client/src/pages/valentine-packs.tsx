import React from "react";
import { Link } from "wouter";

export default function ValentinePacks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-red-400 to-red-700 flex flex-col justify-center items-center py-16">
      <div className="text-center">
        <h1 className="font-playfair text-6xl font-bold text-white mb-6 drop-shadow-lg">Valentine Packs</h1>
        <p className="text-white text-2xl mb-8 max-w-2xl mx-auto drop-shadow">
          Celebrate love with our exclusive Valentine's Day treats!<br />
          <span className="block text-4xl font-extrabold text-yellow-200 mt-8 animate-pulse">Coming Soon!</span>
        </p>
        <div className="flex justify-center mt-8">
          <Link href="/">
            <button className="bg-white text-red-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-red-100 transition-all text-lg">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center">
        <span className="text-pink-100 text-6xl animate-bounce">💖</span>
        <span className="text-pink-100 text-4xl animate-bounce mt-2">💝</span>
      </div>
    </div>
  );
} 