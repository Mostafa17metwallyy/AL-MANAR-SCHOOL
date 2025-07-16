import React from "react";
import Navbar from "@/components/NavBar";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext"; // ✅ Import language hook

const ArabicDivision = () => {
  const { language } = useLanguage(); // ✅ Get selected language

  return (
    <div className="bg-white">
      <Navbar />
      <div className="h-20" /> {/* Spacer for fixed navbar */}

      {/* Banner with Overlay */}
      <div className="relative w-full h-[65vh] rounded-b-xl overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/4.jpg"
          alt="Arabic Division Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-3xl md:text-5xl font-semibold text-center tracking-wide">
            {language === "en"
              ? <>WELCOME TO THE <br /> ARABIC DIVISION</>
              : <>مرحباً بكم في <br /> القسم العربي</>}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-black text-xl font-bold border-l-4 border-teal-500 pl-3 mb-6">
          {language === "en" ? "Arabic Division" : "القسم العربي"}
        </h2>

        <div className="space-y-6 text-gray-700 text-base leading-7">
          <p>
            {language === "en"
              ? "Our Arabic Division provides an enriching educational experience that combines strong academics with deep cultural and moral values. The curriculum focuses on strengthening Arabic language skills, Islamic studies, and essential academic subjects while fostering a love for learning."
              : "يوفر القسم العربي تجربة تعليمية غنية تجمع بين الجانب الأكاديمي القوي والقيم الثقافية والأخلاقية العميقة. يركز المنهج على تعزيز مهارات اللغة العربية والدراسات الإسلامية والمواد الأكاديمية الأساسية مع تنمية حب التعلم."}
          </p>
          <p>
            {language === "en"
              ? "Guided by highly qualified educators, students engage in interactive lessons that enhance comprehension, creativity, and teamwork. We emphasize character building and the development of ethical and social responsibility to prepare students for future challenges."
              : "بإشراف معلمين مؤهلين تأهيلاً عالياً، يشارك الطلاب في دروس تفاعلية تعزز الفهم والإبداع والعمل الجماعي. نركز على بناء الشخصية وتطوير المسؤولية الأخلاقية والاجتماعية لإعداد الطلاب لمواجهة تحديات المستقبل."}
          </p>
          <p>
            {language === "en"
              ? "Beyond academics, students participate in cultural, artistic, and community-based activities that instill pride in heritage and encourage active citizenship. This holistic approach ensures students are well-prepared academically and personally for the future."
              : "إلى جانب الجانب الأكاديمي، يشارك الطلاب في الأنشطة الثقافية والفنية والمجتمعية التي تعزز الفخر بالتراث وتشجع على المواطنة الفاعلة. يضمن هذا النهج الشامل إعداد الطلاب أكاديميًا وشخصيًا للمستقبل."}
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

export default ArabicDivision;
