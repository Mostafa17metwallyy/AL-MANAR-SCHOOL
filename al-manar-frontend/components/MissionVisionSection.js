import React from "react";
import { useLanguage } from "../components/LanguageContext"; // adjust path if needed
import { TbTargetArrow } from "react-icons/tb"; // Mission icon
import { FiEye } from "react-icons/fi";         // Vision icon

/**
 * Wide "band" card with an overlapping circular icon.
 */
const Band = ({ dir, title, body, Icon }) => {
  const rtl = dir === "rtl";
  return (
    <div className="relative">
      {/* Card / band */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md">
        <div className={`px-6 sm:px-10 py-10 ${rtl ? "text-right" : "text-left"}`}>
          {/* teal subtitle */}
          <h3 className="text-teal-600 font-semibold text-2xl mb-3">{title}</h3>
          {/* body text, non-bulleted */}
          <p className="text-gray-700 leading-8 max-w-5xl">
            {body}
          </p>
        </div>
      </div>

      {/* Overlapping circular icon */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${
          rtl ? "right-6 sm:right-10" : "left-6 sm:left-10"
        }`}
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-teal-600/10 border-4 border-white shadow grid place-items-center">
          <div className="w-16 h-16 grid place-items-center rounded-full bg-teal-600 text-white">
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MissionVisionSection = () => {
  const { language } = useLanguage();
  const isAR = language === "ar";
  const dir = isAR ? "rtl" : "ltr";

  // ——— Text (no bullet points) ———
  const t = {
    ar: {
      heading: "رسالتنا ورؤيتنا",
      sub: "نضع الطالب في قلب العملية التعليمية ونستثمر في قيمه ومهاراته.",
      missionTitle: "الرِّسالة",
      missionBody:
        "توفير بيئة تعليمية آمنة ومحفزة على التعلم والإبداع، وتنمية شخصية الطالب علمياً وأخلاقياً واجتماعياً، مع توظيف التكنولوجيا الحديثة في التعليم لتحقيق مخرجات تعليمية عالية الجودة، وتعزيز قيم الانتماء والمواطنة لدى الطلاب.",
      visionTitle: "الرؤية",
      visionBody:
        "إعداد جيل متميز قادر على مواكبة متغيرات العصر في ضوء المعايير القومية للتعليم والتعلم المستمر والإبداع، يمتلك القيم الأخلاقية والمهارات الحياتية ويساهم بفاعلية في بناء مجتمع متطور.",
    },
    en: {
      heading: "Our Mission & Vision",
      sub: "We place the student at the heart of learning and invest in values and skills.",
      missionTitle: "Mission",
      missionBody:
        "To provide a safe and stimulating educational environment that fosters learning and creativity, develop students holistically—academically, morally, and socially—leverage modern technology to achieve high-quality learning outcomes, and strengthen students’ sense of belonging and citizenship.",
      visionTitle: "Vision",
      visionBody:
        "Preparing a distinguished generation capable of keeping pace with contemporary changes in light of national standards for education, lifelong learning, and creativity—one that possesses moral values and life skills and contributes effectively to building a progressive society.",
    },
  }[language];

  return (
    <section id="mission-vision" dir={dir} className="bg-white py-20">
      {/* Top heading (black) */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className={`font-extrabold text-3xl md:text-4xl text-black ${isAR ? "text-right" : "text-left"}`}>
          {t.heading}
        </h2>
        <p className={`text-gray-600 mt-2 ${isAR ? "text-right" : "text-left"}`}>{t.sub}</p>
        <div className="h-1 w-24 bg-teal-500 rounded-full mt-4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Mission */}
        <Band dir={dir} title={t.missionTitle} body={t.missionBody} Icon={TbTargetArrow} />
        {/* Vision */}
        <Band dir={dir} title={t.visionTitle} body={t.visionBody} Icon={FiEye} />
      </div>
    </section>
  );
};

export default MissionVisionSection;
