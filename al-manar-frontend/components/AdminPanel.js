import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [admissions, setAdmissions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slotInput, setSlotInput] = useState('');
  const [announcement, setAnnouncement] = useState({ title: '', description: '', mediaUrl: '', mediaType: 'text' });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/admission').then(res => res.json()).then(setAdmissions);
    fetch('/api/timeslots').then(res => res.json()).then(setSlots);
    fetch('/api/announcements').then(res => res.json()).then(setAnnouncements);
  }, []);

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/timeslots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot: slotInput })
    });
    const newSlot = await res.json();
    setSlots(prev => [...prev, newSlot]);
    setSlotInput('');
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    });
    const newAnn = await res.json();
    setAnnouncements(prev => [...prev, newAnn]);
    setAnnouncement({ title: '', description: '', mediaUrl: '', mediaType: 'text' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 p-6 flex justify-center pt-40">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Admin Panel</h1>

        {/* Admissions Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Admissions</h2>
          <div className="overflow-x-auto rounded shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Division</th>
                  <th className="px-4 py-2">Slot</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((a, i) => (
                  <tr key={i} className="bg-white even:bg-gray-50 border-b">
                    <td className="px-4 py-2">{a.firstName} {a.lastName}</td>
                    <td className="px-4 py-2">{a.email}</td>
                    <td className="px-4 py-2">{a.division}</td>
                    <td className="px-4 py-2">{a.timeSlot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add Time Slot */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Add Time Slot</h2>
          <form onSubmit={handleSlotSubmit} className="flex gap-3">
            <input
              value={slotInput}
              onChange={(e) => setSlotInput(e.target.value)}
              placeholder="e.g. 10:00 AM - 10:30 AM"
              className="flex-1 border border-gray-300 px-3 py-2 rounded shadow-sm placeholder-black"
              required
            />
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Add</button>
          </form>
        </section>

        {/* Add Announcement */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Post Announcement</h2>
          <form onSubmit={handleAnnouncementSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded shadow-sm placeholder-black"
              value={announcement.title}
              onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full border px-3 py-2 rounded shadow-sm placeholder-black"
              value={announcement.description}
              onChange={(e) => setAnnouncement({ ...announcement, description: e.target.value })}
              required
            />
            <input
              type="file"
              accept="image/*,video/*"
              className="w-full border px-3 py-2 rounded shadow-sm text-black"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  const type = file.type.startsWith('image') ? 'image' : 'video';
                  setAnnouncement({ ...announcement, mediaUrl: url, mediaType: type });
                }
              }}
            />
            <select
              className="w-full border px-3 py-2 rounded shadow-sm text-black"
              value={announcement.mediaType}
              onChange={(e) => setAnnouncement({ ...announcement, mediaType: e.target.value })}
            >
              <option value="text">Text Only</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Post</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
