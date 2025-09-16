import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "./LanguageContext"; // Adjust path if needed
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* Reusable spinner */
const Spinner = ({ label = "Loading..." }) => (
  <div className="flex items-center gap-2 text-gray-500">
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <span>{label}</span>
  </div>
);

/* Simple skeleton block */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const AdminPanel = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [admissions, setAdmissions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // submit/action loader (you already had this)
  const [loading, setLoading] = useState(false);

  // fetch loaders
  const [admissionsLoading, setAdmissionsLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [annLoading, setAnnLoading] = useState(true);

  // optional error states (nice for empty vs. error)
  const [admissionsErr, setAdmissionsErr] = useState("");
  const [slotsErr, setSlotsErr] = useState("");
  const [annErr, setAnnErr] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    mediaType: "text",
    file: null,
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") router.push("/login");

    // Admissions
    (async () => {
      try {
        setAdmissionsLoading(true);
        const res = await fetch(`${BASE}/api/admission`);
        const data = await res.json();
        setAdmissions(Array.isArray(data) ? data : []);
        setAdmissionsErr("");
      } catch (e) {
        setAdmissions([]);
        setAdmissionsErr("Failed to load admissions.");
      } finally {
        setAdmissionsLoading(false);
      }
    })();

    // Time slots
    (async () => {
      try {
        setSlotsLoading(true);
        const res = await fetch(`${BASE}/api/timeslots`);
        const data = await res.json();
        setSlots(Array.isArray(data) ? data : []);
        setSlotsErr("");
      } catch (e) {
        setSlots([]);
        setSlotsErr("Failed to load time slots.");
      } finally {
        setSlotsLoading(false);
      }
    })();

    // Announcements
    (async () => {
      try {
        setAnnLoading(true);
        const res = await fetch(`${BASE}/api/announcements`);
        const data = await res.json();
        setAnnouncements(
          Array.isArray(data) ? data.map((a) => ({ ...a, editing: false })) : []
        );
        setAnnErr("");
      } catch (e) {
        setAnnouncements([]);
        setAnnErr("Failed to load announcements.");
      } finally {
        setAnnLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime)
      return toast.error("Start and end time required");
    setLoading(true);

    try {
      const res = await fetch(`${BASE}/api/timeslots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: startTime, end: endTime }),
      });
      const data = await res.json();

      if (!res.ok) return toast.error(data.error || "Slot creation failed");

      setSlots((prev) => [...prev, ...(Array.isArray(data) ? data : [data])]);
      setStartTime("");
      setEndTime("");
      toast.success("Time slot added!");
    } catch {
      toast.error("Server error while creating slots");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      await fetch(`${BASE}/api/timeslots/${id}`, { method: "DELETE" });
      setSlots((prev) => prev.filter((s) => s._id !== id));
      toast.success("Slot deleted");
    } catch {
      toast.error("Error deleting slot");
    }
  };

  const handleDeleteAdmission = async (id) => {
    try {
      const res = await fetch(`${BASE}/api/admission/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return toast.error("Delete failed");
      setAdmissions((prev) => prev.filter((a) => a._id !== id));
      toast.success("Admission deleted");
    } catch {
      toast.error("Error deleting admission");
    }
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", announcement.title);
    formData.append("description", announcement.description);
    formData.append("mediaType", announcement.mediaType);
    if (announcement.file) formData.append("media", announcement.file);

    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/announcements`, {
        method: "POST",
        body: formData,
      });
      const newAnn = await res.json();
      if (!res.ok || !newAnn._id)
        return toast.error("Failed to post announcement.");

      setAnnouncements((prev) => [...prev, { ...newAnn, editing: false }]);
      setAnnouncement({
        title: "",
        description: "",
        mediaType: "text",
        file: null,
      });
      toast.success("Announcement posted");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`${BASE}/api/announcements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return toast.error("Delete failed");

      const updated = await fetch(`${BASE}/api/announcements`).then((r) =>
        r.json()
      );
      if (Array.isArray(updated)) {
        setAnnouncements(updated.map((a) => ({ ...a, editing: false })));
        toast.success("Announcement deleted");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleSaveAnnouncement = async (index) => {
    const ann = announcements[index];
    const formData = new FormData();
    formData.append("title", ann.title);
    formData.append("description", ann.description);
    formData.append("mediaType", ann.mediaType);
    if (ann.file) formData.append("media", ann.file);

    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/announcements/${ann._id}`, {
        method: "PUT",
        body: formData,
      });
      const updated = await res.json();
      const updatedList = [...announcements];
      updatedList[index] = { ...updated, editing: false };
      setAnnouncements(updatedList);
      toast.success("Announcement updated");
    } catch {
      toast.error("Error saving changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 p-6"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Toaster position="top-right" />
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded z-50 shadow-md"
      >
        {language === "en" ? "Logout" : "تسجيل الخروج"}
      </button>

      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-black">
          {language === "en" ? "Admin Panel" : "لوحة التحكم"}
        </h1>

        {/* Admissions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {language === "en" ? "All Admissions" : "جميع الطلبات"}
          </h2>

          {admissionsLoading ? (
            <div className="bg-white rounded shadow p-4">
              <Spinner
                label={
                  language === "en"
                    ? "Loading admissions..."
                    : "جارِ تحميل الطلبات..."
                }
              />
              <div className="mt-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="grid grid-cols-6 gap-3">
                    {[...Array(6)].map((__, j) => (
                      <Skeleton key={j} className="h-5" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : admissionsErr ? (
            <p className="text-red-600">{admissionsErr}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow text-black">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2">
                      {language === "en" ? "Name" : "الاسم"}
                    </th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">
                      {language === "en" ? "Division" : "القسم"}
                    </th>
                    <th className="px-4 py-2">
                      {language === "en" ? "Year" : "الصف"}
                    </th>
                    <th className="px-4 py-2">
                      {language === "en" ? "Slot" : "الميعاد"}
                    </th>
                    <th className="px-4 py-2">
                      {language === "en" ? "Actions" : "إجراءات"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((a, i) => (
                    <tr key={i} className="even:bg-gray-50">
                      <td className="px-4 py-2">
                        {a.firstName} {a.lastName}
                      </td>
                      <td className="px-4 py-2">{a.email}</td>
                      <td className="px-4 py-2">{a.division}</td>
                      <td className="px-4 py-2">{a.year}</td>
                      <td className="px-4 py-2">{a.timeSlot}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDeleteAdmission(a._id)}
                          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                        >
                          {language === "en" ? "Delete" : "حذف"}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {admissions.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        {language === "en"
                          ? "No admissions yet."
                          : "لا توجد طلبات حتى الآن."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Add Time Slot */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-black">
            {language === "en" ? "Add Time Slot" : "إضافة موعد"}
          </h2>
          <form
            onSubmit={handleSlotSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-3 py-2 rounded text-black w-full sm:w-auto"
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border px-3 py-2 rounded text-black w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-teal-600 text-white px-4 py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? language === "en"
                  ? "Saving..."
                  : "جارِ الحفظ..."
                : language === "en"
                ? "Add"
                : "إضافة"}
            </button>
          </form>

          <div className="mt-4 space-y-2">
            {slotsLoading ? (
              <>
                <Spinner
                  label={
                    language === "en"
                      ? "Loading time slots..."
                      : "جارِ تحميل المواعيد..."
                  }
                />
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </>
            ) : slotsErr ? (
              <p className="text-red-600 mt-2">{slotsErr}</p>
            ) : slots.length === 0 ? (
              <p className="text-gray-500 mt-2">
                {language === "en" ? "No slots yet." : "لا توجد مواعيد بعد."}
              </p>
            ) : (
              slots.map((slot) => (
                <div
                  key={slot._id}
                  className="flex flex-col sm:flex-row justify-between bg-white p-3 rounded shadow text-black"
                >
                  <span>{slot.slot}</span>
                  <button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mt-2 sm:mt-0"
                  >
                    {language === "en" ? "Delete" : "حذف"}
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-black">
            {language === "en" ? "Post Announcement" : "إضافة إعلان"}
          </h2>
          <form onSubmit={handleAnnouncementSubmit} className="space-y-3">
            <input
              type="text"
              placeholder={language === "en" ? "Title" : "العنوان"}
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
            <textarea
              placeholder={
                language === "en"
                  ? "Description (Markdown supported)"
                  : "الوصف (يدعم Markdown)"
              }
              value={announcement.description}
              onChange={(e) =>
                setAnnouncement({
                  ...announcement,
                  description: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded text-black min-h-[140px]"
              required
            />
            <p className="text-xs text-gray-500">
              {language === "en"
                ? "Tips: Use **bold**, _italic_, - lists, ## headings, and [links](https://example.com)."
                : "نصائح: استخدم **غامق**، _مائل_، - قوائم، ## عناوين، و [روابط](https://example.com)."}
            </p>
            <div className="mt-3 border rounded bg-white p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">
                {language === "en" ? "Preview" : "معاينة"}
              </h4>
              <div
                className={`${
                  language === "ar" ? "text-right" : "text-left"
                } text-gray-800 leading-7`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="list-disc ml-5 space-y-1" />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol {...props} className="list-decimal ml-5 space-y-1" />
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} className="my-2" />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 {...props} className="text-2xl font-bold my-3" />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 {...props} className="text-xl font-bold my-3" />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 {...props} className="text-lg font-semibold my-2" />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong {...props} className="font-semibold" />
                    ),
                    em: ({ node, ...props }) => (
                      <em {...props} className="italic" />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        {...props}
                        className="border-s-4 ps-3 italic text-gray-600 my-3"
                      />
                    ),
                    code: ({ inline, ...props }) =>
                      inline ? (
                        <code
                          {...props}
                          className="px-1 py-0.5 rounded bg-gray-100"
                        />
                      ) : (
                        <pre className="p-3 rounded bg-gray-100 overflow-x-auto">
                          <code {...props} />
                        </pre>
                      ),
                  }}
                >
                  {announcement.description ||
                    (language === "en"
                      ? "_Start typing…_"
                      : "_ابدأ بالكتابة…_")}
                </ReactMarkdown>
              </div>
            </div>{" "}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const type = file.type.startsWith("image")
                    ? "image"
                    : "video";
                  setAnnouncement({ ...announcement, file, mediaType: type });
                }
              }}
              className="w-full text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-teal-600 text-white px-6 py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? language === "en"
                  ? "Posting..."
                  : "جارِ النشر..."
                : language === "en"
                ? "Post"
                : "نشر"}
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {language === "en" ? "Announcements" : "الإعلانات"}
          </h2>

          {annLoading ? (
            <div className="space-y-4">
              <Spinner
                label={
                  language === "en"
                    ? "Loading announcements..."
                    : "جارِ تحميل الإعلانات..."
                }
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded shadow space-y-3"
                  >
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : annErr ? (
            <p className="text-red-600">{annErr}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((ann, index) => (
                <div key={ann._id} className="bg-white p-4 rounded shadow">
                  {ann.editing ? (
                    <>
                      <input
                        className="w-full border mb-2 px-2 py-1 text-black"
                        value={ann.title}
                        onChange={(e) => {
                          const updated = [...announcements];
                          updated[index].title = e.target.value;
                          setAnnouncements(updated);
                        }}
                      />
                      <textarea
                        className="w-full border mb-2 px-2 py-1 text-black"
                        value={ann.description}
                        onChange={(e) => {
                          const updated = [...announcements];
                          updated[index].description = e.target.value;
                          setAnnouncements(updated);
                        }}
                      />
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updated = [...announcements];
                          updated[index].file = file;
                          updated[index].mediaType = file?.type.startsWith(
                            "image"
                          )
                            ? "image"
                            : "video";
                          setAnnouncements(updated);
                        }}
                      />
                      <button
                        onClick={() => handleSaveAnnouncement(index)}
                        disabled={loading}
                        className={`bg-green-600 text-white px-3 py-1 mr-2 rounded ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {language === "en" ? "Save" : "حفظ"}
                      </button>
                      <button
                        onClick={() => {
                          const updated = [...announcements];
                          updated[index].editing = false;
                          setAnnouncements(updated);
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        {language === "en" ? "Cancel" : "إلغاء"}
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-black">
                        {ann.title}
                      </h3>
                      <p className="text-sm mb-2 text-black">
                        {ann.description}
                      </p>
                      {ann.mediaType === "image" && ann.mediaUrl && (
                        <img
                          src={ann.mediaUrl}
                          className="w-full rounded mb-2"
                          alt="announcement media"
                        />
                      )}
                      {ann.mediaType === "video" && ann.mediaUrl && (
                        <video controls className="w-full rounded mb-2">
                          <source src={ann.mediaUrl} />
                        </video>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            const updated = [...announcements];
                            updated[index].editing = true;
                            setAnnouncements(updated);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          {language === "en" ? "Edit" : "تعديل"}
                        </button>
                        <button
                          onClick={() => handleDeleteAnnouncement(ann._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          {language === "en" ? "Delete" : "حذف"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {announcements.length === 0 && (
                <p className="text-gray-500">
                  {language === "en"
                    ? "No announcements yet."
                    : "لا توجد إعلانات بعد."}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
