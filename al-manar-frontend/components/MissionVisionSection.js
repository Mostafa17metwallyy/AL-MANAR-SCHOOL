import React from "react";
import { useLanguage } from "@/contexts/LanguageContext"; // ← update if needed
import { TbTargetArrow } from "react-icons/tb"; // throwing dart / target
import { FiEye } from "react-icons/fi";         // eye icon

// Reusable “band” block
const Pill = ({ dir, title, body, Icon }) => {
  const rtl = dir === "rtl";
  return (
    <div className="relative">
      {/* band */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md">
        <div className={`flex items-start gap-5 px-6 sm:px-10 py-8 md:py-10 ${rtl ? "text-right" : "text-left"}`}>
          <div className="flex-1">
            {/* subtitle in teal */}
            <h3 className="text-teal-600 font-semibold text-xl mb-2">{title}</h3>
            <div className="text-gray-700 leading-7">{body}</div>
          </div>
        </div>
      </div>

      {/* circular icon overlapping the band */}
      <div className={`absolute -top-8 ${rtl ? "right-6 sm:right-10" : "left-6 sm:left-10"}`}>
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

  const t = {
    ar: {
      heading: "رسالتنا ورؤيتنا",
      sub: "نضع الطالب في قلب العملية التعليمية ونستثمر في قيمه ومهاراته.",
      missionTitle: "الرِّسالة",
      missionBody: (
        <ul className="list-disc list-inside space-y-2">
          <li>تَوفيرُ بِيئَةٍ تَعْلِيمِيَّةٍ آمِنَةٍ ومُحَفِّزَةٍ على التَّعَلُّمِ والإبْداعِ.</li>
          <li>تَنمِيَةُ شَخْصِيَّةِ الطَّالِبِ عِلْمِيًّا وأَخْلاقِيًّا واجتِماعِيًّا.</li>
          <li>اسْتِخْدامُ التِّكْنُولوجيا الحَديثَةِ في التَّعْلِيمِ لِتَحقيقِ مَخْرُجاتٍ تَعْلِيمِيَّةٍ عالِيَةِ الجَوْدَةِ.</li>
          <li>تَعْزيزُ قِيَمِ الانْتِماءِ والْمُواطَنَةِ لَدَى الطُّلَّابِ.</li>
        </ul>
      ),
      visionTitle: "الرؤية",
      visionBody:
        "إعْدادُ جيلٍ مُتَمَيِّزٍ، قادِرٍ على مُواكَبَةِ مُتَغَيِّراتِ العَصْرِ، في ضَوْءِ المَعاييرِ القَومِيَّةِ لِلتَّعْلِيمِ، والتَّعَلُّمِ المُسْتَمِرِّ، والإبْداعِ، يَمْتَلِكُ القِيَمَ الأخْلاقِيَّةَ وَالمَهاراتِ الحَياتِيَّةَ، ويُساهِمُ بِفاعِلِيَّةٍ في بِنَاءِ مُجتَمَعٍ مُتَطَوِّرٍ.",
    },
    en: {
      heading: "Our Mission & Vision",
      sub: "We place the student at the heart of learning and invest in values and skills.",
      missionTitle: "Mission",
      missionBody: (
        <ul className="list-disc list-inside space-y-2">
          <li>Providing a safe and stimulating educational environment that fosters learning and creativity.</li>
          <li>Developing students’ personalities academically, morally, and socially.</li>
          <li>Utilizing modern technology in education to achieve high-quality learning outcomes.</li>
          <li>Promoting values of belonging and citizenship among students.</li>
        </ul>
      ),
      visionTitle: "Vision",
      visionBody:
        "Preparing a distinguished generation capable of keeping pace with contemporary changes in light of national standards for education, lifelong learning, and creativity. They possess moral values and life skills and contribute effectively to building a progressive society.",
    },
  }[language];

  return (
    <section id="mission-vision" dir={dir} className="bg-white py-20">
      {/* top heading (black) */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className={`font-bold text-3xl md:text-4xl text-black ${isAR ? "text-right" : "text-left"}`}>
          {t.heading}
        </h2>
        <p className={`text-gray-600 mt-2 ${isAR ? "text-right" : "text-left"}`}>{t.sub}</p>
        <div className="h-1 w-24 bg-teal-500 rounded-full mt-4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-8">
        {/* Mission band */}
        <Pill dir={dir} title={t.missionTitle} body={t.missionBody} Icon={TbTargetArrow} />
        {/* Vision band */}
        <Pill dir={dir} title={t.visionTitle} body={<p>{t.visionBody}</p>} Icon={FiEye} />
      </div>
    </section>
  );
};

export default MissionVisionSection;

