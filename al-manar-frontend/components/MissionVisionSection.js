import React from "react";
import { useLanguage } from "../components/LanguageContext"; // keep your path
import { TbTargetArrow } from "react-icons/tb"; // Mission icon
import { FiEye } from "react-icons/fi";         // Vision icon

// Band card with SIDE-BY-SIDE icon that moves to the proper side per language
const Band = ({ dir, title, body, Icon }) => {
  const rtl = dir === "rtl";

  // icon should be RIGHT in AR, LEFT in EN
  const iconBox = `shrink-0 grid place-items-center ${
    rtl ? "order-2 ml-4" : "order-1 mr-4"
  }`;

  const textBox = `flex-1 leading-8 ${
    rtl ? "order-1 text-right" : "order-2 text-left"
  }`;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md">
      <div className="px-6 sm:px-10 py-8 md:py-10 flex items-center gap-5 md:gap-8">
        {/* Icon column */}
        <div className={iconBox}>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-teal-600/10 border-4 border-white shadow grid place-items-center">
            <div className="w-14 h-14 grid place-items-center rounded-full bg-teal-600 text-white">
              <Icon className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Text column */}
        <div className={textBox}>
          <h3 className="text-teal-600 font-semibold text-2xl mb-2">{title}</h3>
          <p className="text-gray-700">{body}</p>
        </div>
      </div>
    </div>
  );
};

const MissionVisionSection = () => {
  const { language } = useLanguage();
  const isAR = language === "ar";
  const dir = isAR ? "rtl" : "ltr";

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
      {/* Centered heading & subheading */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="font-extrabold text-3xl md:text-4xl text-black">
          {t.heading}
        </h2>
        <p className="text-teal-600 mt-2">
          {t.sub}
        </p>
        <div className="h-1 w-24 bg-teal-500 rounded-full mt-4 mx-auto" />
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
