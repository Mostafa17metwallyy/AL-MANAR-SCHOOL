import React from 'react';
import { useRouter } from 'next/router';

const divisions = [
  {
    title: 'National Division',
    image: '/assets/3.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.',
  },
  {
    title: 'Arabic Division',
    image: '/assets/4.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.',
  },
];

const DivisionsSection = () => {
  const router = useRouter();

  const handleExplore = (title) => {
    const path = title.toLowerCase().includes('national')
      ? '/national-division'
      : '/arabic-division';
    router.push(path);
  };

  return (
    <section id="divisions" className="bg-white py-20">
      <div className="text-center mb-12">
        <h2 className="text-teal-600 font-bold text-xl">Divisions</h2>
        <p className="text-lg font-semibold">Check Out Our Educational Divisions</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {divisions.map((division, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src={division.image}
                alt={division.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-4 text-black text-3xl font-bold drop-shadow">
                {index + 1}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 border-l-4 border-blue-500 pl-2">
                {division.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{division.description}</p>
              <button
                onClick={() => handleExplore(division.title)}
                className="bg-teal-500 text-white text-sm px-4 py-2 rounded-full hover:bg-teal-600"
              >
                Explore more →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DivisionsSection;
