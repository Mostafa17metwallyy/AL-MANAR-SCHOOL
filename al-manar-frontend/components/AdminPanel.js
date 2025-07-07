import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminPanel = () => {
  const router = useRouter();

  const [admissions, setAdmissions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    mediaType: "text",
    file: null,
  });
  const [announcements, setAnnouncements] = useState([]);
  const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.replace("/login");
    }
  }, []);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/login");
    }

    fetch(`${BASE}/api/admission`)
      .then((res) => res.json())
      .then((data) => setAdmissions(Array.isArray(data) ? data : []))
      .catch(() => setAdmissions([]));

    fetch(`${BASE}/api/timeslots`)
      .then((res) => res.json())
      .then((data) => setSlots(Array.isArray(data) ? data : []))
      .catch(() => setSlots([]));

    fetch(`${BASE}/api/announcements`)
      .then((res) => res.json())
      .then((data) =>
        setAnnouncements(
          Array.isArray(data) ? data.map((a) => ({ ...a, editing: false })) : []
        )
      )
      .catch(() => setAnnouncements([]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) return alert("Start and end time required");

    try {
      const res = await fetch(`${BASE}/api/timeslots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: startTime, end: endTime }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Slot creation failed");

      setSlots((prev) => [...prev, ...(Array.isArray(data) ? data : [data])]);
      setStartTime("");
      setEndTime("");
    } catch {
      alert("Server error while creating slots");
    }
  };

  const handleDeleteSlot = async (id) => {
    await fetch(`${BASE}/api/timeslots/${id}`, { method: "DELETE" });
    setSlots((prev) => prev.filter((s) => s._id !== id));
  };

  const handleDeleteAdmission = async (id) => {
    const res = await fetch(`${BASE}/api/admission/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return alert("Delete failed");
    setAdmissions((prev) => prev.filter((a) => a._id !== id));
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
      mediaType: "text",
      file: null,
    });
  };

  const handleDeleteAnnouncement = async (id) => {
    await fetch(`${BASE}/api/announcements/${id}`, { method: "DELETE" });
    setAnnouncements((prev) => prev.filter((a) => a._id !== id));
  };

  const handleSaveAnnouncement = async (index) => {
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
    const updatedList = [...announcements];
    updatedList[index] = { ...updated, editing: false };
    setAnnouncements(updatedList);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-black">
          Admin Panel
        </h1>

        {/* Admissions Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            All Admissions
          </h2>
          <table className="w-full bg-white rounded shadow">
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
                <tr key={i} className="even:bg-gray-50">
                  <td className="px-4 py-2 text-black">
                    {a.firstName} {a.lastName}
                  </td>
                  <td className="px-4 py-2 text-black">{a.email}</td>
                  <td className="px-4 py-2 text-black">{a.division}</td>
                  <td className="px-4 py-2 text-black">{a.timeSlot}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteAdmission(a._id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Time Slot Creation */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-black">
            Add Time Slot
          </h2>
          <form onSubmit={handleSlotSubmit} className="flex gap-3 items-center">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-3 py-2 rounded text-black"
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border px-3 py-2 rounded text-black"
              required
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </form>
          <div className="mt-4 space-y-2">
            {slots.map((slot) => (
              <div
                key={slot._id}
                className="flex justify-between bg-white p-3 rounded shadow"
              >
                <span className="text-black">{slot.slot}</span>
                <button
                  onClick={() => handleDeleteSlot(slot._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Add Announcement */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-black">
            Post Announcement
          </h2>
          <form onSubmit={handleAnnouncementSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
            <textarea
              placeholder="Description"
              value={announcement.description}
              onChange={(e) =>
                setAnnouncement({
                  ...announcement,
                  description: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
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
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Post
            </button>
          </form>
        </section>

        {/* Show Announcements */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Announcements
          </h2>
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
                      className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
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
                    <h3 className="text-lg font-bold text-black">
                      {ann.title}
                    </h3>
                    <p className="text-sm mb-2 text-black">{ann.description}</p>
                    {ann.mediaType === "image" && (
                      <img
                        src={`${BASE}${ann.mediaUrl}`}
                        className="w-full rounded mb-2"
                        alt=""
                      />
                    )}
                    {ann.mediaType === "video" && (
                      <video controls className="w-full rounded mb-2">
                        <source src={`${BASE}${ann.mediaUrl}`} />
                      </video>
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
