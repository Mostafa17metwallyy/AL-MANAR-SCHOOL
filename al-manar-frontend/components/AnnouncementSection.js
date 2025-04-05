import React, { useEffect, useState } from 'react';

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-100 py-20 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-700">📢 Announcements</h2>
          <p className="text-gray-500">Stay up-to-date with the latest updates from our school</p>
        </div>

        {announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 text-lg mt-20 animate-pulse">
            <p className="text-xl font-semibold text-gray-600">📭 No announcements yet</p>
            <p className="text-sm text-gray-400 mt-1">Please check back later for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {announcements.map((ann, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 animate-fadeIn"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-teal-800 mb-2">{ann.title}</h3>
                  <p className="text-gray-700 mb-3">{ann.description}</p>

                  {ann.mediaType === 'image' && ann.mediaUrl && (
                    <img
                      src={ann.mediaUrl}
                      alt="announcement media"
                      className="w-full rounded-md object-cover"
                    />
                  )}

                  {ann.mediaType === 'video' && ann.mediaUrl && (
                    <video controls className="w-full rounded-md">
                      <source src={ann.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementSection;