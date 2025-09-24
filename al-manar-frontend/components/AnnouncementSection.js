import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { sanitize } from "isomorphic-dompurify";

const isArabic = (s = "") => /[\u0600-\u06FF]/.test(s);

const Spinner = ({ label = "Loading..." }) => (
  <div className="flex items-center justify-center gap-2 text-gray-500">
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span>{label}</span>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6 space-y-3 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-40 bg-gray-200 rounded w-full" />
    </div>
  </div>
);

/* nice short date */
const fmtDate = (iso, ar) => {
  try {
    return new Intl.DateTimeFormat(ar ? "ar-EG" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso?.slice(0, 10) || "";
  }
};

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { language } = useLanguage();
  const isAr = language === "ar";

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/announcements`);
        const data = await res.json();
        if (Array.isArray(data)) {
          // newest first (in case API isn’t sorted)
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAnnouncements(data);
          setErr("");
        } else {
          setAnnouncements([]);
          setErr("Invalid response.");
        }
      } catch (e) {
        setAnnouncements([]);
        setErr(isAr ? "فشل في جلب الإعلانات." : "Failed to fetch announcements.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-100 pt-32 pb-20 px-4 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-700 whitespace-nowrap">
            {isAr ? "الإعلانات" : "Announcements"}
          </h2>
          <p className="text-gray-500">
            {isAr ? "ابقَ على اطلاع بأحدث الأخبار والتحديثات من مدرستنا" : "Stay up-to-date with the latest updates from our school"}
          </p>
        </div>

        {loading ? (
          <>
            <div className="mb-6">
              <Spinner label={isAr ? "جارِ تحميل الإعلانات..." : "Loading announcements..."} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        ) : err ? (
          <div className="flex flex-col items-center justify-center text-center text-red-600 text-lg mt-10">
            {err}
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 text-lg mt-20">
            <p className="text-xl font-semibold text-gray-600">
              {isAr ? "لا توجد إعلانات حالياً" : "No announcements yet"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {isAr ? "يرجى العودة لاحقاً لمزيد من التحديثات." : "Please check back later for updates."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((ann, index) => {
              const rtl = isArabic(ann.description) || isAr;
              return (
                <article
                  key={index}
                  className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-6 min-h-[260px]"
                  dir={rtl ? "rtl" : "ltr"}
                >
                  <h3 className="text-xl font-semibold text-teal-800 mb-2">{ann.title}</h3>

                  <div className={`${rtl ? "text-right" : "text-left"} text-gray-800 leading-7 mb-3`}>
                    <div
                      className="prose max-w-none text-gray-800 leading-7"
                      dangerouslySetInnerHTML={{
                        __html: sanitize(
                          /<\/?[a-z][\s\S]*>/i.test(ann.description || "")
                            ? ann.description
                            : (ann.description || "").replace(/\n/g, "<br/>")
                        ),
                      }}
                    />
                  </div>

                  {ann.mediaType === "image" && ann.mediaUrl && (
                    <img src={ann.mediaUrl} alt="announcement media" className="w-full rounded-md object-cover" />
                  )}

                  {ann.mediaType === "video" && ann.mediaUrl && (
                    <video controls className="w-full rounded-md">
                      <source src={ann.mediaUrl} type="video/mp4" />
                      {isAr ? "متصفحك لا يدعم تشغيل الفيديو." : "Your browser does not support the video tag."}
                    </video>
                  )}

                  {/* >>> Bottom-right creation date <<< */}
                  <time
                    dateTime={ann.createdAt}
                    className={`absolute bottom-3 ${rtl ? "left-4" : "right-4"} text-xs text-gray-500`}
                    title={new Date(ann.createdAt).toLocaleString()}
                  >
                    {fmtDate(ann.createdAt, isAr)}
                  </time>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementSection;
