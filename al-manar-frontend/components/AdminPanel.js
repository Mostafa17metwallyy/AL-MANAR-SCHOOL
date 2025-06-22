import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [admissions, setAdmissions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slotInput, setSlotInput] = useState("");
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    mediaUrl: "",
    mediaType: "text",
  });
  const [announcements, setAnnouncements] = useState([]);

  const BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    fetch(`${BASE}/api/admission`)
      .then((res) => res.json())
      .then(setAdmissions);
    fetch(`${BASE}/api/timeslots`)
      .then((res) => res.json())
      .then(setSlots);
    fetch(`${BASE}/api/announcements`)
      .then((res) => res.json())
      .then(setAnnouncements);
  }, []);

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE}/api/timeslots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: slotInput }),
    });
    const newSlot = await res.json();
    setSlots((prev) => [...prev, newSlot]);
    setSlotInput("");
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", announcement.title);
    formData.append("description", announcement.description);
    formData.append("mediaType", announcement.mediaType);
    if (announcement.file) {
      formData.append("media", announcement.file);
    }

    const res = await fetch(`${BASE}/api/announcements`, {
      method: "POST",
      body: formData,
    });
    const newAnn = await res.json();
    setAnnouncements((prev) => [...prev, newAnn]);
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
    if (ann.file) {
      formData.append("media", ann.file);
    }

    const res = await fetch(`${BASE}/api/announcements/${ann._id}`, {
      method: "PUT",
      body: formData,
    });

    const updated = await res.json();
    setAnnouncements((prev) =>
      prev.map((a, i) => (i === index ? { ...updated, editing: false } : a))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 p-6 flex justify-center pt-40">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Admin Panel
        </h1>

        {/* Admissions Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            All Admissions
          </h2>
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
                    <td className="px-4 py-2">
                      {a.firstName} {a.lastName}
                    </td>
                    <td className="px-4 py-2">{a.email}</td>
                    <td className="px-4 py-2">{a.division}</td>
                    <td className="px-4 py-2">{a.timeSlot || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add Time Slot */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Add Time Slot
          </h2>
          <form onSubmit={handleSlotSubmit} className="flex gap-3">
            <input
              value={slotInput}
              onChange={(e) => setSlotInput(e.target.value)}
              placeholder="e.g. 10:00 AM - 10:30 AM"
              className="flex-1 border border-gray-300 px-3 py-2 rounded shadow-sm placeholder-black text-black"
              required
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Add
            </button>
          </form>
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

        {/* Manage Announcements */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            All Announcements
          </h2>
          <div className="space-y-6">
            {announcements.map((ann, i) => (
              <div
                key={i}
                className="border p-4 rounded bg-white shadow-sm space-y-2"
              >
                {ann.editing ? (
                  <>
                    <input
                      className="w-full border rounded px-3 py-2 text-black"
                      value={ann.title}
                      onChange={(e) =>
                        setAnnouncements((prev) =>
                          prev.map((a, index) =>
                            index === i ? { ...a, title: e.target.value } : a
                          )
                        )
                      }
                    />
                    <textarea
                      className="w-full border rounded px-3 py-2 text-black"
                      value={ann.description}
                      onChange={(e) =>
                        setAnnouncements((prev) =>
                          prev.map((a, index) =>
                            index === i
                              ? { ...a, description: e.target.value }
                              : a
                          )
                        )
                      }
                    />
                    <select
                      className="border px-2 py-1 rounded text-black"
                      value={ann.mediaType}
                      onChange={(e) =>
                        setAnnouncements((prev) =>
                          prev.map((a, index) =>
                            index === i
                              ? { ...a, mediaType: e.target.value }
                              : a
                          )
                        )
                      }
                    >
                      <option value="text">Text Only</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const type = file.type.startsWith("image")
                            ? "image"
                            : "video";
                          setAnnouncements((prev) =>
                            prev.map((a, index) =>
                              index === i
                                ? {
                                    ...a,
                                    file,
                                    mediaType: type,
                                  }
                                : a
                            )
                          );
                        }
                      }}
                      className="w-full mt-2 border px-3 py-2 rounded shadow-sm text-black"
                    />
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => handleSave(i)}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          setAnnouncements((prev) =>
                            prev.map((a, index) =>
                              index === i ? { ...a, editing: false } : a
                            )
                          )
                        }
                        className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-teal-700">
                      {ann.title}
                    </h3>
                    <p className="text-gray-700">{ann.description}</p>

                    {ann.mediaType === "image" && ann.mediaUrl && (
                      <img
                        src={ann.mediaUrl}
                        alt="preview"
                        className="rounded w-full max-h-60 object-cover"
                      />
                    )}
                    {ann.mediaType === "video" && ann.mediaUrl && (
                      <video controls className="rounded w-full max-h-60">
                        <source src={ann.mediaUrl} type="video/mp4" />
                      </video>
                    )}
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() =>
                          setAnnouncements((prev) =>
                            prev.map((a, index) =>
                              index === i ? { ...a, editing: true } : a
                            )
                          )
                        }
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
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
