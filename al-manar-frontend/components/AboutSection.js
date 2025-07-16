import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { useLanguage } from "./LanguageContext"; // ✅ Import language hook

const AboutSection = () => {
  const { language } = useLanguage(); // ✅ Get selected language

  return (
    <section id="about" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side Text */}
        <div className="md:w-1/2">
          <h2 className="text-teal-600 font-bold text-sm mb-2">
            {language === "en" ? "Al Manar School" : "مدرسة المنار"}
          </h2>
          <p className="text-base text-gray-700">
            {language === "en"
              ? <>Watch our video guide – learn more<br />about our school, and our educational<br />programs.</>
              : <>شاهد دليلنا المرئي – وتعرف أكثر<br />على مدرستنا وبرامجنا التعليمية.<br />{""}</>}
          </p>
        </div>

        {/* Right Side "Video" Thumbnail */}
        <div className="md:w-1/2 relative rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://via.placeholder.com/500x300.png?text=Video+Coming+Soon"
            alt="School Video Preview"
            className="w-full h-auto object-cover"
          />
          <FaPlayCircle className="absolute inset-0 m-auto text-white text-6xl opacity-80 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
