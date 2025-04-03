import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-blue-50 min-h-screen overflow-hidden" id="home">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-36 flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Text Area */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-teal-600 font-bold text-sm mb-2">Heading</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            LOREM IPSUM DOLOR SIT <br /> AMET CONSECTETUR.
          </h1>
          <p className="text-sm text-gray-600 max-w-md">
            Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit.
            Dolor turpis molestie dui magnis facilisis at fringilla quam.
          </p>
        </div>

        {/* Images */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <img src="/assets/1.jpg" alt="img1" className="rounded-lg shadow-lg object-cover w-full h-32 md:h-40" />
          <img src="/assets/2.jpg" alt="img2" className="rounded-lg shadow-lg object-cover w-full h-32 md:h-40" />
          <img src="/assets/3.jpg" alt="img3" className="rounded-lg shadow-lg object-cover w-full h-32 md:h-40" />
          <img src="/assets/4.jpg" alt="img4" className="rounded-lg shadow-lg object-cover w-full h-32 md:h-40" />
        </div>
      </div>

      {/* Wave Background - Full Height */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/Rectangle3.png" alt="Wave 1" className="w-full h-full object-cover" />
        <img src="/assets/Rectangle4.png" alt="Wave 2" className="w-full h-full object-cover absolute top-0 left-0" />
      </div>
    </div>
  );
};

export default HeroSection;
