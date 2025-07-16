import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { useLanguage } from "./LanguageContext"; // ✅ Import language hook

const AboutSection = () => {
  const { language } = useLanguage(); // ✅ Get selected language

  return (
    <section id="about" className="bg-white py-28"> {/* ✅ Increased padding */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-14">
        
        {/* ✅ Left Side Text */}
        <div className="md:w-1/2">
          <h2 className="text-teal-600 font-bold text-2xl mb-4"> {/* ✅ Bigger heading */}
            {language === "en" ? "Al Manar School" : "مدرسة المنار"}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed"> {/* ✅ Bigger paragraph */}
            {language === "en"
              ? (
                <>
                  Watch our video guide – learn more<br />
                  about our school, and our educational<br />
                  programs.
                </>
              ) : (
                <>
                  شاهد دليلنا المرئي – وتعرف أكثر<br />
                  على مدرستنا وبرامجنا التعليمية.
                </>
              )}
          </p>
        </div>

        {/* ✅ Right Side Logo/Image */}
        <div className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/assets/LOGO.png" // ✅ Using your logo
            alt="Al Manar School Logo"
            className="w-full h-72 object-contain bg-white p-6" // ✅ Bigger height & proper scaling
          />
          {/* Optional play icon - remove if not needed */}
          {/* <FaPlayCircle className="absolute inset-0 m-auto text-teal-500 text-7xl opacity-80 pointer-events-none" /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
