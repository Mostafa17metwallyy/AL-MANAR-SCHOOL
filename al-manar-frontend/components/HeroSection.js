import React from "react";
import { useLanguage } from "./LanguageContext"; // ✅ Import the language hook

const HeroSection = () => {
  const { language } = useLanguage(); // ✅ Get selected language

  return (
    <div className="relative bg-blue-50 min-h-screen overflow-hidden" id="home">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 flex flex-col md:flex-row justify-between items-center relative z-10">
        
        {/* Text Area - Slightly smaller */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-teal-600 font-bold text-base mb-3">
            {language === "en" ? "Welcome to Al Manar School" : "مرحباً بكم في مدرسة المنار"}
          </h2>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug mb-5">
            {language === "en"
              ? <>Empowering Young Minds with <br /> Quality Education</>
              : <>تمكين العقول الشابة من خلال <br /> تعليم عالي الجودة</>}
          </h1>

          <p className="text-sm md:text-base text-gray-700 max-w-md leading-relaxed">
            {language === "en"
              ? "Al Manar School provides a nurturing learning environment with dedicated teachers, modern facilities, and innovative programs that inspire students to achieve their full potential."
              : "توفر مدرسة المنار بيئة تعليمية داعمة مع معلمين متميزين ومرافق حديثة وبرامج مبتكرة تلهم الطلاب لتحقيق إمكاناتهم الكاملة."}
          </p>
        </div>

        {/* Images - Slightly smaller */}
        <div className="md:w-1/2 grid grid-cols-2 gap-5">
          <img
            src="/assets/1.jpg"
            alt="img1"
            className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48"
          />
          <img
            src="/assets/2.jpg"
            alt="img2"
            className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48"
          />
          <img
            src="/assets/3.jpg"
            alt="img3"
            className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48"
          />
          <img
            src="/assets/4.jpg"
            alt="img4"
            className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48"
          />
        </div>
      </div>

      {/* Wave Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/Rectangle3.png"
          alt="Wave 1"
          className="w-full h-full object-cover"
        />
        <img
          src="/assets/Rectangle4.png"
          alt="Wave 2"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>
    </div>
  );
};

export default HeroSection;
