import React from "react";
import { useRouter } from "next/router";
import { useLanguage } from "./LanguageContext"; // ✅ Import language context

const DivisionsSection = () => {
  const router = useRouter();
  const { language } = useLanguage(); // ✅ Get current language

  // ✅ Division content for both languages
  const divisions = [
    {
      title:
        language === "en" ? "National Division" : "القسم اللغات",
      image: "/assets/3.jpg",
      description:
        language === "en"
          ? "Our National Division follows the Egyptian Ministry of Education curriculum, ensuring strong academic foundations while integrating modern teaching techniques to help students excel."
          : "يتبع القسم الوطني منهج وزارة التربية والتعليم المصرية، مما يضمن أساسًا أكاديميًا قويًا مع دمج أساليب التعليم الحديثة لمساعدة الطلاب على التفوق.",
    },
    {
      title:
        language === "en" ? "Arabic Division" : "القسم العربي",
      image: "/assets/4.jpg",
      description:
        language === "en"
          ? "Our Arabic Division provides a rich educational experience focusing on the national curriculum, Arabic language, and cultural values, nurturing students academically and personally."
          : "يوفر القسم العربي تجربة تعليمية غنية تركز على المنهج الوطني، واللغة العربية، والقيم الثقافية، مما ينمّي الطلاب أكاديميًا وشخصيًا.",
    },
  ];

  const handleExplore = (title) => {
    const path = title.includes("National") || title.includes("الوطني")
      ? "/national-division"
      : "/arabic-division";
    router.push(path);
  };

  return (
    <section id="divisions" className="bg-white py-28"> {/* ✅ Bigger top & bottom padding */}
      {/* ✅ Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-black font-bold text-3xl">
          {language === "en" ? "Divisions" : "الأقسام"}
        </h2>
        <p className="text-xl font-semibold text-teal-600 mt-3">
          {language === "en"
            ? "Check Out Our Educational Divisions"
            : "تعرّف على أقسامنا التعليمية"}
        </p>
      </div>

      {/* ✅ Division Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {divisions.map((division, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="relative">
              {/* ✅ Taller images */}
              <img
                src={division.image}
                alt={division.title}
                className="w-full h-60 object-cover"
              />
              <span className="absolute top-3 right-5 text-black text-4xl font-bold drop-shadow">
                {index + 1}
              </span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-teal-600 mb-4 border-l-4 border-teal-600 pl-3">
                {division.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {division.description}
              </p>
              <button
                onClick={() => handleExplore(division.title)}
                className="bg-teal-500 text-white text-lg px-6 py-3 rounded-full hover:bg-teal-600 transition-all"
              >
                {language === "en" ? "Explore more →" : "استكشف المزيد →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DivisionsSection;
