import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [admissions, setAdmissions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    mediaUrl: "",
    mediaType: "text",
  });
  const [announcements, setAnnouncements] = useState([]);

  const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  useEffect(() => {
    fetch(`${BASE}/api/admission`)
      .then((res) => res.json())
      .then(setAdmissions);
    fetch(`${BASE}/api/timeslots`)
      .then((res) => res.json())
      .then(setSlots);
    fetch(`${BASE}/api/announcements`)
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data.map((a) => ({ ...a, editing: false })));
      });
  }, []);

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) return alert("Start and end time are required");

    try {
      const res = await fetch(`${BASE}/api/timeslots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: startTime, end: endTime }),
      });
      const data = await res.json();
      if (!res.ok)
        return alert("Failed to create slots: " + (data.error || ""));

      setSlots((prev) => [...prev, ...data]);
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error(err);
      alert("Server error while creating slots.");
    }
  };

  const handleDeleteSlot = async (id) => {
    await fetch(`${BASE}/api/timeslots/${id}`, { method: "DELETE" });
    setSlots((prev) => prev.filter((s) => s._id !== id));
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", announcement.title);
    formData.append("description", announcement.description);
    formData.append("mediaType", announcement.mediaType);
    if (announcement.file) formData.append("media", announcement.file);

    const res = await fetch(`${BASE}/api/announcements`, {
      method: "POST",
      body: formData,
    });
    const newAnn = await res.json();
    setAnnouncements((prev) => [...prev, { ...newAnn, editing: false }]);
    setAnnouncement({
      title: "",
      description: "",
      mediaUrl: "",
      mediaType: "text",
      file: null,
    });
  };

  const handleDeleteAnnouncement = async (id) => {
    await fetch(`${BASE}/api/announcements/${id}`, { method: "DELETE" });
    setAnnouncements((prev) => prev.filter((a) => a._id !== id));
  };

  const handleSave = async (index) => {
    const ann = announcements[index];
    const formData = new FormData();
    formData.append("title", ann.title);
    formData.append("description", ann.description);
    formData.append("mediaType", ann.mediaType);
    if (ann.file) formData.append("media", ann.file);

    const res = await fetch(`${BASE}/api/announcements/${ann._id}`, {
      method: "PUT",
      body: formData,
    });
    const updated = await res.json();
    setAnnouncements((prev) =>
      prev.map((a, i) => (i === index ? { ...updated, editing: false } : a))
    );
  };
  const handleDeleteAdmission = async (id) => {
    try {
      const res = await fetch(`${BASE}/api/admission/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        return alert("Failed to delete: " + (err.error || ""));
      }

      setAdmissions((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Server error while deleting admission");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 p-6 flex justify-center pt-40">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Admin Panel
        </h1>

        {/* Admissions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            All Admissions
          </h2>
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Division</th>
                <th className="px-4 py-2">Slot</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((a, i) => (
                <tr key={i} className="bg-white even:bg-gray-50 border-b">
                  <td className="px-4 py-2">
                    {a.firstName} {a.lastName}
                  </td>
                  <td className="px-4 py-2">{a.email}</td>
                  <td className="px-4 py-2">{a.division}</td>
                  <td className="px-4 py-2">{a.timeSlot || "-"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteAdmission(a._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Time Slots */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Add Time Slot
          </h2>
          <form onSubmit={handleSlotSubmit} className="flex gap-3 items-center">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-3 py-2 rounded shadow-sm text-black"
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border px-3 py-2 rounded shadow-sm text-black"
              required
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Add
            </button>
          </form>
          <div className="mt-4 space-y-2">
            {slots.map(
              (slot) =>
                slot.slot && (
                  <div
                    key={slot._id}
                    className="flex justify-between items-center bg-white shadow px-4 py-3 rounded"
                  >
                    <span className="font-semibold text-gray-800">
                      {slot.slot}
                    </span>
                    <button
                      onClick={() => handleDeleteSlot(slot._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
          </div>
        </section>

        {/* Post Announcement */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Post Announcement
          </h2>
          <form onSubmit={handleAnnouncementSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded shadow-sm placeholder-black text-black"
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              className="w-full border px-3 py-2 rounded shadow-sm placeholder-black text-black"
              value={announcement.description}
              onChange={(e) =>
                setAnnouncement({
                  ...announcement,
                  description: e.target.value,
                })
              }
              required
            />
            <input
              type="file"
              accept="image/*,video/*"
              className="w-full border px-3 py-2 rounded shadow-sm text-black"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const type = file.type.startsWith("image")
                    ? "image"
                    : "video";
                  setAnnouncement({ ...announcement, mediaType: type, file });
                }
              }}
            />
            <select
              className="w-full border px-3 py-2 rounded shadow-sm text-black"
              value={announcement.mediaType}
              onChange={(e) =>
                setAnnouncement({ ...announcement, mediaType: e.target.value })
              }
            >
              <option value="text">Text Only</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </form>
        </section>

        {/* Display Announcements */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            All Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((ann, index) => (
              <div
                key={ann._id}
                className="bg-white shadow rounded p-4 relative"
              >
                {ann.editing ? (
                  <>
                    <input
                      className="w-full mb-2 border px-2 py-1 rounded text-black"
                      value={ann.title}
                      onChange={(e) => {
                        const updated = [...announcements];
                        updated[index].title = e.target.value;
                        setAnnouncements(updated);
                      }}
                    />
                    <textarea
                      className="w-full mb-2 border px-2 py-1 rounded text-black"
                      value={ann.description}
                      onChange={(e) => {
                        const updated = [...announcements];
                        updated[index].description = e.target.value;
                        setAnnouncements(updated);
                      }}
                    />
                    <input
                      type="file"
                      className="mb-2"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const updated = [...announcements];
                          updated[index].file = file;
                          updated[index].mediaType = file.type.startsWith(
                            "image"
                          )
                            ? "image"
                            : "video";
                          setAnnouncements(updated);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        const updated = [...announcements];
                        updated[index].editing = false;
                        setAnnouncements(updated);
                      }}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-teal-700">
                      {ann.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {ann.description}
                    </p>
                    {ann.mediaType === "image" && (
                      <img
                        src={`${BASE}/${ann.mediaUrl}`}
                        alt="announcement"
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    {ann.mediaType === "video" && (
                      <video
                        src={`${BASE}/${ann.mediaUrl}`}
                        controls
                        className="w-full h-40 rounded mb-2"
                      />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const updated = [...announcements];
                          updated[index].editing = true;
                          setAnnouncements(updated);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
