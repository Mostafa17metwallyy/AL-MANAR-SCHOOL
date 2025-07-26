import React, { useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext"; 

const AboutSection = () => {
  const { language } = useLanguage();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.3 } // Play when 30% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-14">
        
        {/* ✅ Left Side Text */}
        <div className="md:w-1/2">
          <h2 className="text-teal-600 font-bold text-2xl mb-4">
            {language === "en" ? "Al Manar School" : "مدرسة المنار"}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {language === "en"
              ? (
                <>
                  Watch our video guide – learn more<br />
                  about our school, and our educational<br />
                  programs.
                </>
              ) : (
                <>
                  شاهد دليلنا المرئي – وتعرف أكثر<br />
                  على مدرستنا وبرامجنا التعليمية.
                </>
              )}
          </p>
        </div>

        {/* ✅ Right Side Video */}
        <div className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            src="/assets/school_video.mp4" // ✅ replace with actual video path
            className="w-full h-[36rem] object-cover rounded-xl"
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
