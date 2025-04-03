import React, { useState } from 'react';

const AdmissionSection = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    year: '',
    division: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', form);
    // TODO: send form to backend later
  };

  return (
    <section id="admission" className="bg-white py-20">
      <div className="text-center mb-10">
        <h2 className="text-teal-600 font-bold text-sm">Early Admission Is Now Available</h2>
        <p className="text-gray-500">Fill Out This Form</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter your first name..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter your last name..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-Mail*</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your e-mail..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Birth Date*</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year*</label>
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Enter your grade..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Division*</label>
          <select
            name="division"
            value={form.division}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          >
            <option value="">Select division</option>
            <option value="National Division">National Division</option>
            <option value="Arabic Division">Arabic Division</option>
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
