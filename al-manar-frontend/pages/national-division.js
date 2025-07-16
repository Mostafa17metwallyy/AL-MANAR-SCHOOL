import React from "react";
import Navbar from "@/components/NavBar";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext"; // ✅ Import language hook

const NationalDivision = () => {
  const { language } = useLanguage(); // ✅ Get selected language

  return (
    <div className="bg-white">
      <Navbar />
      <div className="h-20" /> {/* Spacer for fixed navbar */}

      {/* Banner Section */}
      <div className="relative w-full h-[65vh] rounded-b-xl overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/4.jpg"
          alt="National Division Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Lighter Tint Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-3xl md:text-5xl font-semibold text-center tracking-wide">
            {language === "en"
              ? <>WELCOME TO THE <br /> NATIONAL DIVISION</>
              : <>مرحباً بكم في <br /> القسم الوطني</>}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-black text-xl font-bold border-l-4 border-teal-500 pl-3 mb-6">
          {language === "en" ? "National Division" : "القسم الوطني"}
        </h2>

        <div className="space-y-6 text-gray-700 text-base leading-7">
          <p>
            {language === "en"
              ? "Our National Division offers a comprehensive educational program that aligns with the Egyptian Ministry of Education curriculum. We focus on building a strong foundation in core subjects such as Mathematics, Science, and Languages, while also encouraging critical thinking and creativity."
              : "يقدم القسم الوطني برنامجاً تعليمياً شاملاً يتماشى مع منهج وزارة التربية والتعليم المصرية. نركز على بناء أساس قوي في المواد الأساسية مثل الرياضيات والعلوم واللغات، مع تشجيع التفكير النقدي والإبداع."}
          </p>
          <p>
            {language === "en"
              ? "Students are taught using modern teaching techniques, interactive learning environments, and technology-integrated classrooms. We prepare them for national exams with confidence while nurturing their social and emotional well-being through various extracurricular activities."
              : "يُدرَّس الطلاب باستخدام أساليب تعليمية حديثة وبيئات تعلم تفاعلية وفصول دراسية مدمجة بالتكنولوجيا. نُعدهم للامتحانات الوطنية بثقة مع رعاية رفاهيتهم الاجتماعية والعاطفية من خلال الأنشطة اللاصفية المختلفة."}
          </p>
          <p>
            {language === "en"
              ? "In addition to academics, we emphasize moral values, leadership skills, and character development, ensuring that every student grows into a well-rounded, responsible, and active member of society."
              : "بالإضافة إلى الجوانب الأكاديمية، نركز على القيم الأخلاقية ومهارات القيادة وتنمية الشخصية، لضمان أن ينمو كل طالب ليصبح عضواً متكاملاً ومسؤولاً وفاعلاً في المجتمع."}
          </p>
        </div>

        {/* Apply Button */}
        <div className="text-center mt-10">
          <Link href="/#admission">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition">
              {language === "en" ? "APPLY NOW" : "قدّم الآن"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NationalDivision;
