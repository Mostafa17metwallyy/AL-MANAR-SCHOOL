import React from "react";
import { useLanguage } from "../components/LanguageContext";

const MissionVisionSection = () => {
  const { language } = useLanguage();
  const isAR = language === "ar";

  const t = {
    ar: {
      sectionId: "mission-vision",
      visionTitle: "الرؤية",
      visionBody:
        "إعْدادُ جيلٍ مُتَمَيِّزٍ، قادِرٍ على مُواكَبَةِ مُتَغَيِّراتِ العَصْرِ، في ضَوْءِ المَعاييرِ القَومِيَّةِ لِلتَّعْلِيمِ، والتَّعَلُّمِ المُسْتَمِرِّ، والإبْداعِ، يَمْتَلِكُ القِيَمَ الأخْلاقِيَّةَ وَالمَهاراتِ الحَياتِيَّةَ، ويُساهِمُ بِفاعِلِيَّةٍ في بِنَاءِ مُجتَمَعٍ مُتَطَوِّرٍ.",
      missionTitle: "الرِّسالة",
      missionBullets: [
        "تَوفيرُ بِيئَةٍ تَعْلِيمِيَّةٍ آمِنَةٍ ومُحَفِّزَةٍ على التَّعَلُّمِ والإبْداعِ.",
        "تَنمِيَةُ شَخْصِيَّةِ الطَّالِبِ عِلْمِيًّا وأَخْلاقِيًّا واجتِماعِيًّا.",
        "اسْتِخْدامُ التِّكْنُولوجيا الحَديثَةِ في التَّعْلِيمِ لِتَحقيقِ مَخْرُجاتٍ تَعْلِيمِيَّةٍ عالِيَةِ الجَوْدَةِ.",
        "تَعْزيزُ قِيَمِ الانْتِماءِ والْمُواطَنَةِ لَدَى الطُّلَّابِ.",
      ],
      labelVision: "الرؤية",
      labelMission: "الرِّسالة",
    },
    en: {
      sectionId: "mission-vision",
      visionTitle: "Vision",
      visionBody:
        "Preparing a distinguished generation capable of keeping pace with contemporary changes in light of national standards for education, lifelong learning, and creativity. They possess moral values and life skills and contribute effectively to building a progressive society.",
      missionTitle: "Mission",
      missionBullets: [
        "Providing a safe and stimulating educational environment that fosters learning and creativity.",
        "Developing students’ personalities academically, morally, and socially.",
        "Utilizing modern technology in education to achieve high-quality learning outcomes.",
        "Promoting values of belonging and citizenship among students.",
      ],
      labelVision: "Vision",
      labelMission: "Mission",
    },
  }[language];

  return (
    <section
      id={t.sectionId}
      dir={isAR ? "rtl" : "ltr"}
      className="bg-white py-20"
    >
      {/* Section Header */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-teal-600 font-bold text-xl">
          {isAR ? "رسالتنا ورؤيتنا" : "Our Mission & Vision"}
        </h2>
        <p className="text-gray-600 mt-2">
          {isAR
            ? "نحن نضع الطالب في قلب العملية التعليمية ونستثمر في قيمه ومهاراته."
            : "We place the student at the heart of learning and invest in values and skills."}
        </p>
      </div>

      {/* Two-column content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Vision Card */}
        <div className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {t.visionTitle}
              {!isAR && <span className="sr-only"> (Vision)</span>}
            </h3>
            <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold rounded-full px-3 py-1">
              {isAR ? "Vision | الرؤية" : "Vision"}
            </span>
          </div>
          <div className={`px-6 py-6 ${isAR ? "text-right" : "text-left"}`}>
            <p className="text-gray-700 leading-7">{t.visionBody}</p>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {t.missionTitle}
              {!isAR && <span className="sr-only"> (Mission)</span>}
            </h3>
            <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold rounded-full px-3 py-1">
              {isAR ? "Mission | الرِّسالة" : "Mission"}
            </span>
          </div>

          {/* Lists: keep markers on the correct side */}
          <div
            className={`px-6 py-6 ${
              isAR ? "text-right pr-6" : "text-left pl-6"
            }`}
          >
            <ul
              className={`space-y-3 text-gray-700 leading-7 ${
                isAR ? "list-disc list-inside rtl:pr-0" : "list-disc list-inside"
              }`}
              style={{
                // ensure bullets align visually in RTL too
                paddingInlineStart: isAR ? 0 : undefined,
              }}
            >
              {t.missionBullets.map((item, idx) => (
                <li key={idx} className={isAR ? "pr-2" : "pl-2"}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative bottom bar to match site accents */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="h-1 w-24 bg-teal-500 rounded-full mx-auto" />
      </div>
    </section>
  );
};

export default MissionVisionSection;
