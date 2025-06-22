import React, { useEffect, useState } from 'react';

const AdmissionSection = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    year: '',
    division: '',
    selectedSlot: '',
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Fetch only unreserved slots
    fetch('http://localhost:5000/api/timeslots')
      .then((res) => res.json())
      .then((data) => {
        const unreserved = data.filter((s) => !s.reservedBy);
        setAvailableSlots(unreserved);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Save admission form
      const admissionRes = await fetch('http://localhost:5000/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!admissionRes.ok) {
        const errData = await admissionRes.json();
        return alert('Form error: ' + errData.error);
      }

      // 2. Reserve the selected time slot
      const reserveRes = await fetch(
        `http://localhost:5000/api/timeslots/${form.selectedSlot}/reserve`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: form.email }),
        }
      );

      if (!reserveRes.ok) {
        const err = await reserveRes.json();
        return alert('Slot reservation failed: ' + err.error);
      }

      alert('Form submitted and slot reserved!');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        year: '',
        division: '',
        selectedSlot: '',
      });
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <section id="admission" className="bg-white py-20">
      <div className="text-center mb-10">
        <h2 className="text-teal-600 font-bold text-sm">Early Admission Is Now Available</h2>
        <p className="text-gray-500">Fill Out This Form</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 space-y-4">
        {/* All input fields... */}
        {/* firstName, lastName, email, birthDate, year, division */}

        {/* Slot selection dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Choose Interview Slot*</label>
          <select
            name="selectedSlot"
            value={form.selectedSlot}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
          >
            <option value="">Select a slot</option>
            {availableSlots.map((slot) => (
              <option key={slot._id} value={slot._id}>
                {slot.slot}
              </option>
            ))}
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
