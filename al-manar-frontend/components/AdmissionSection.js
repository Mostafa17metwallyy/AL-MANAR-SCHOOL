import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("http://localhost:5000/api/timeslots")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched time slots:", data); // ✅ Debug log
        setAvailableSlots(data.slots || data);   // ✅ Handles both array and object format
      })
      .catch((err) => {
        console.error("Failed to fetch time slots:", err);
        setAvailableSlots([]); // Fallback to empty array on error
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const admissionRes = await fetch("http://localhost:5000/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!admissionRes.ok) {
        const errData = await admissionRes.json();
        return alert("Form error: " + errData.error);
      }

      alert("Form submitted and slot reserved!");
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
      alert("Server error. Please try again later.");
    }
  };

  return (
    <section id="admission" className="bg-white py-20">
      <div className="text-center mb-10">
        <h2 className="text-teal-600 font-bold text-sm">
          Early Admission Is Now Available
        </h2>
        <p className="text-gray-500">Fill Out This Form</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 space-y-4 text-black">
        {["firstName", "lastName", "email", "birthDate", "year"].map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field === "year" ? "Academic Year*" : `${field.replace(/([A-Z])/g, " $1")}*`}
            </label>
            <input
              type={field === "birthDate" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field === "year" ? "grade" : field}...`}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black placeholder:text-black"
              required
            />
          </div>
        ))}

        {/* Division */}
        <div>
          <label className="block text-sm font-medium mb-1">Division*</label>
          <select
            name="division"
            value={form.division}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black bg-white"
            required
          >
            <option value="" disabled hidden>Select division</option>
            <option value="National Division">National Division</option>
            <option value="Arabic Division">Arabic Division</option>
          </select>
        </div>

        {/* Interview Slot */}
        <div>
          <label className="block text-sm font-medium mb-1">Choose Interview Slot*</label>
          <select
            name="selectedSlot"
            value={form.selectedSlot}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black bg-white"
            required
          >
            <option value="" disabled hidden>Select a slot</option>
            {Array.isArray(availableSlots) && availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <option key={slot._id} value={slot._id}>{slot.slot}</option>
              ))
            ) : (
              <option disabled>No available slots</option>
            )}
          </select>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdmissionSection;
