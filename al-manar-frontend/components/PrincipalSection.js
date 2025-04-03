import React from "react";

const PrincipalSection = () => {
  return (
    <section className="relative bg-[#00594F] text-white py-28 overflow-hidden">
      {/* Top Wave */}
      <img
        src="/assets/GREEN1.png"
        alt="Top Wave"
        className="absolute top-0 left-0 w-full z-0"
      />
      <img
        src="/assets/GREEN2.png"
        alt="Top Wave"
        className="absolute top-0 left-0 w-full z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Principal Info - Image on Left */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/assets/principle.jpeg"
            alt="Dr. Marwan Saad"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">DR. Marwan Saad</h3>
            <p className="text-sm text-gray-200">Director of school</p>
          </div>
        </div>

        {/* Paragraphs Left Aligned */}
        <div className="font-bold text-base leading-7 text-white space-y-6 text-left">
          <p>
            Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
            elit. Dolor &nbsp; turpis molestie dui magnis facilisis at fringilla quam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
            elit. Dolor &nbsp; turpis molestie dui magnis facilisis at fringilla quam.
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <img
        src="/assets/GREEN3.png"
        alt="Bottom Wave"
        className="absolute bottom-0 left-0 w-full z-0"
      />
    </section>
  );
};

export default PrincipalSection;
