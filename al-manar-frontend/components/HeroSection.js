import React from "react";
import { useLanguage } from "./LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();
  const isArabic = String(language || "en").toLowerCase().startsWith("ar");

  const dict = {
    en: {
      welcome: "Welcome to Al Manar School",
      headingA: "Empowering Young Minds with",
      headingB: "Quality Education",
      body:
        "Al Manar School provides a nurturing learning environment with dedicated teachers, modern facilities, and innovative programs that inspire students to achieve their full potential.",
      announcements: "Announcements",
      admission: "Admission Form",
    },
    ar: {
      welcome: "مرحباً بكم في مدرسة المنار",
      headingA: "تمكين العقول الشابة من خلال",
      headingB: "تعليم عالي الجودة",
      body:
        "توفر مدرسة المنار بيئة تعليمية داعمة مع معلمين متميزين ومرافق حديثة وبرامج مبتكرة تلهم الطلاب لتحقيق إمكاناتهم الكاملة.",
      announcements: "الإعلانات",
      admission: "نموذج التقديم",
    },
  };

  const t = isArabic ? dict.ar : dict.en;

  return (
    <div
      id="home"
      className="relative bg-blue-50 min-h-screen overflow-hidden"
      lang={isArabic ? "ar" : "en"}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 flex flex-col md:flex-row justify-between items-center relative z-10">
        
        {/* Text Area */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-teal-600 font-bold text-base mb-3">
            {t.welcome}
          </h2>

          <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 leading-snug mb-5 ${isArabic ? "text-right" : "text-left"}`}>
            <>
              {t.headingA} <br /> {t.headingB}
            </>
          </h1>

          <p className={`text-sm md:text-base text-gray-700 max-w-md leading-relaxed mb-6 ${isArabic ? "text-right" : "text-left"}`}>
            {t.body}
          </p>

          {/* CTA Buttons (flip order in Arabic) */}
          <div className={`flex flex-wrap items-center gap-3 ${isArabic ? "flex-row-reverse" : "flex-row"}`}>
            {/* Announcements */}
            <a
              href="/announcements"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-teal-600 text-white text-sm md:text-base font-semibold hover:bg-teal-700 transition"
            >
              {t.announcements}
            </a>

            {/* Admission Form */}
            <a
              href="#admission"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-teal-600 text-teal-700 hover:bg-teal-50 text-sm md:text-base font-semibold transition"
            >
              {t.admission}
            </a>
          </div>
        </div>

        {/* Images */}
        <div className="md:w-1/2 grid grid-cols-2 gap-5">
          <img src="/assets/1.jpg" alt="img1" className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48" />
          <img src="/assets/2.jpg" alt="img2" className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48" />
          <img src="/assets/3.jpg" alt="img3" className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48" />
          <img src="/assets/4.jpg" alt="img4" className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48" />
        </div>
      </div>

      {/* Wave Background */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/Rectangle3.png" alt="Wave 1" className="w-full h-full object-cover" />
        <img src="/assets/Rectangle4.png" alt="Wave 2" className="w-full h-full object-cover absolute top-0 left-0" />
      </div>
    </div>
  );
};

export default HeroSection;
