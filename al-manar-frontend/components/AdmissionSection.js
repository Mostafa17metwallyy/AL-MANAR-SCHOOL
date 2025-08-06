import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext"; // adjust path if needed
import toast, { Toaster } from "react-hot-toast";

const AdmissionSection = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    year: "",
    division: "",
    selectedSlot: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const { language } = useLanguage();
  const BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    fetch(`${BASE}/api/timeslots`)
      .then((res) => res.json())
      .then((data) => setAvailableSlots(data.slots || data || []))
      .catch((err) => {
        console.error("Failed to fetch slots:", err);
        setAvailableSlots([]);
      });
  }, []);

  const isOlderThan3Years = (dateStr) => {
    const birthDate = new Date(dateStr);
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
    return birthDate <= threeYearsAgo;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Manual validation
    for (let field in form) {
      if (!form[field]) {
        toast.error(language === "en" ? "Please fill all fields." : "يرجى ملء جميع الحقول.");
        return;
      }
    }

    if (!isOlderThan3Years(form.birthDate)) {
      toast.error(
        language === "en"
          ? "Child must be at least 3 years old."
          : "يجب أن يكون عمر الطفل 3 سنوات على الأقل."
      );
      return;
    }

    try {
      const admissionRes = await fetch(`${BASE}/api/admission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const resJson = await admissionRes.json();

      if (!admissionRes.ok) {
        toast.error(
          language === "en"
            ? "Submission error: " + resJson.error
            : "خطأ في الإرسال: " + resJson.error
        );
        return;
      }

      toast.success(
        language === "en"
          ? "Form submitted and slot reserved!"
          : "تم إرسال النموذج وحجز الموعد بنجاح!"
      );

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        year: "",
        division: "",
        selectedSlot: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        language === "en"
          ? "Server error. Please try again later."
          : "حدث خطأ في الخادم. حاول مرة أخرى لاحقاً."
      );
    }
  };

  const yearOptions = {
    en: ["KG", "Primary", "Preparatory", "Secondary"],
    ar: ["كجم", "ابتدائي", "إعدادي", "ثانوي"],
  };

  const labelText = {
    firstName: language === "en" ? "First Name*" : "الاسم الأول*",
    lastName: language === "en" ? "Last Name*" : "اسم العائلة*",
    email: language === "en" ? "E-Mail*" : "البريد الإلكتروني*",
    birthDate: language === "en" ? "Birth Date*" : "تاريخ الميلاد*",
    year: language === "en" ? "Academic Year*" : "العام الدراسي*",
  };

  return (
    <>
      <Toaster position="top-right" />
      <section id="admission" className="bg-white py-28">
        <div className="text-center mb-14">
          <h2 className="text-teal-600 font-bold text-2xl mb-2">
            {language === "en"
              ? "Early Admission Is Now Available"
              : "التقديم المبكر متاح الآن"}
          </h2>
          <p className="text-gray-600 text-lg">
            {language === "en" ? "Fill Out This Form" : "يرجى ملء هذا النموذج"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto px-6 space-y-6 text-black"
        >
          {["firstName", "lastName", "email", "birthDate"].map((field, i) => (
            <div key={i}>
              <label className="block text-base font-medium mb-2">
                {labelText[field]}
              </label>
              <input
                type={field === "birthDate" ? "date" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={
                  language === "en"
                    ? `Enter your ${
                        field === "email"
                          ? "email"
                          : field === "firstName"
                          ? "first name"
                          : field === "lastName"
                          ? "last name"
                          : "birth date"
                      }...`
                    : `أدخل ${
                        field === "email"
                          ? "البريد الإلكتروني"
                          : field === "firstName"
                          ? "الاسم الأول"
                          : field === "lastName"
                          ? "اسم العائلة"
                          : "تاريخ الميلاد"
                      }...`
                }
                className="w-full border border-gray-300 rounded px-4 py-3 text-base placeholder:text-gray-700"
                required
              />
            </div>
          ))}

          {/* Academic Year Dropdown */}
          <div>
            <label className="block text-base font-medium mb-2">
              {labelText.year}
            </label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 text-base bg-white"
              required
            >
              <option value="" hidden>
                {language === "en" ? "Select year" : "اختر العام"}
              </option>
              {yearOptions[language].map((yearLabel, idx) => (
                <option key={idx} value={yearLabel}>
                  {yearLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Division Dropdown */}
          <div>
            <label className="block text-base font-medium mb-2">
              {language === "en" ? "Division*" : "القسم*"}
            </label>
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 text-base bg-white"
              required
            >
              <option value="" hidden>
                {language === "en" ? "Select division" : "اختر القسم"}
              </option>
              <option value="National Division">
                {language === "en" ? "National Division" : "القسم اللغات"}
              </option>
              <option value="Arabic Division">
                {language === "en" ? "Arabic Division" : "القسم العربي"}
              </option>
            </select>
          </div>

          {/* Time Slot Dropdown */}
          <div>
            <label className="block text-base font-medium mb-2">
              {language === "en"
                ? "Choose Interview Slot*"
                : "اختر موعد المقابلة*"}
            </label>
            <select
              name="selectedSlot"
              value={form.selectedSlot}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 text-base bg-white"
              required
            >
              <option value="" hidden>
                {language === "en" ? "Select a slot" : "اختر موعداً"}
              </option>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <option key={slot._id} value={slot._id}>
                    {slot.slot}
                  </option>
                ))
              ) : (
                <option disabled>
                  {language === "en"
                    ? "No available slots"
                    : "لا توجد مواعيد متاحة"}
                </option>
              )}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-teal-500 text-white text-lg px-8 py-3 rounded-full hover:bg-teal-600 transition-all"
            >
              {language === "en" ? "SUBMIT" : "إرسال"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdmissionSection;
