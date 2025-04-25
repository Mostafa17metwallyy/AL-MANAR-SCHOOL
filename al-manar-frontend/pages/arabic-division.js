import React from 'react';
import Navbar from '@/components/NavBar';
import Link from 'next/link';

const ArabicDivision = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="h-20" />

      {/* Updated Banner Matching Design */}
      <div className="relative w-full h-[65vh] rounded-b-xl overflow-hidden">
        <img
          src="/assets/4.jpg"
          alt="Arabic Division Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-semibold text-center tracking-wide">
            WELCOME TO THE <br /> ARABIC DIVISIONS
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold border-l-4 border-teal-500 pl-3 mb-6">Arabic Division</h2>
        <div className="space-y-6 text-gray-700 text-base leading-7">
          <p>Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit...</p>
          <p>Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit...</p>
          <p>Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit...</p>
        </div>

        <div className="text-center mt-10">
          <Link href="/#admission">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition">
              APPLY NOW
            </button>
          </Link>
        </div>
      </div>

      <img src="/assets/GREEN3.png" alt="Bottom Wave" className="w-full" />
    </div>
  );
};

export default ArabicDivision;
