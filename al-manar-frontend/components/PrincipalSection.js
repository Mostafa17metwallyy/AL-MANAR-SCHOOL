import React from "react";
import { useLanguage } from "./LanguageContext"; // ✅ Import language hook

const PrincipalSection = () => {
  const { language } = useLanguage(); // ✅ Get selected language

  return (
    <section className="relative bg-[#00594F] text-white py-28 overflow-hidden">
      {/* Top Wave */}
      <img
        src="/assets/GREEN1.png"
        alt="Top Wave"
        className="absolute top-0 left-0 w-full z-0"
      />
      <img
        src="/assets/GREEN2.png"
        alt="Top Wave"
        className="absolute top-0 left-0 w-full z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Principal Info - Image on Left */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/assets/principle.jpeg"
            alt="Mrs/Shaimaa Ali"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {language === "en" ? "Mrs/Shaimaa Ali" : "السيدة/ شيماء علي"}
            </h3>
            <p className="text-sm text-gray-200">
              {language === "en" ? "Director of School" : "مديرة المدرسة"}
            </p>
          </div>
        </div>

        {/* Paragraphs Left Aligned */}
        <div className="font-bold text-base leading-7 text-white space-y-6 text-left">
          <p>
            {language === "en"
              ? "At Al Manar School, we believe that education is more than just academic achievement. It is about nurturing values, inspiring curiosity, and empowering our students to become confident, responsible, and compassionate individuals who can make a positive impact in the world."
              : "في مدرسة المنار، نؤمن أن التعليم يتجاوز التحصيل الأكاديمي فقط. إنه يتعلق بغرس القيم، وإلهام حب الاستطلاع، وتمكين طلابنا ليصبحوا أفرادًا واثقين ومسؤولين ورحماء يمكنهم إحداث تأثير إيجابي في العالم."}
          </p>
          <p>
            {language === "en"
              ? "Our dedicated team of educators works tirelessly to provide a balanced and engaging learning environment that fosters creativity, critical thinking, and leadership skills. Together with parents and the community, we strive to prepare our students for a future filled with endless possibilities and success."
              : "يعمل فريقنا المخلص من المعلمين بلا كلل لتوفير بيئة تعليمية متوازنة وجذابة تعزز الإبداع والتفكير النقدي ومهارات القيادة. وبالتعاون مع أولياء الأمور والمجتمع، نسعى لإعداد طلابنا لمستقبل مليء بالفرص والنجاحات."}
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <img
        src="/assets/GREEN3.png"
        alt="Bottom Wave"
        className="absolute bottom-0 left-0 w-full z-0"
      />
    </section>
  );
};

export default PrincipalSection;
