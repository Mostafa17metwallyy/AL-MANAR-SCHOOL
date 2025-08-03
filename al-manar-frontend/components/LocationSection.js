import React from "react";

const LocationSection = () => {
  return (
    <section className="bg-white py-16 px-4" id="location">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-teal-600 font-bold text-xl mb-2">Our Location</h2>
        <p className="text-gray-700 mb-6 text-lg font-semibold">
          Visit Al Manar Islamic Language Nursery on the map below
        </p>

        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.1762603953954!2d31.1944382!3d30.0496937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584136069b099f%3A0xb63620cb89f2d!2z2KfZhNmF2LHYuNipINmE2YXYs9mK2YjYp9mG2Kkg2YXYrdin2YHZiiDZhdmGINin2YTYp9ix2KfYqQ!5e0!3m2!1sar!2seg!4v1690991698841!5m2!1sar!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
