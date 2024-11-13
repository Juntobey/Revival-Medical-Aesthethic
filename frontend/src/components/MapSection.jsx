import React from "react";

const MapSection = () => {
  return (
    <section className="py-16 px-8">
      <h2 className="text-h2 font-bold text-darkgreen font-headers mb-8 text-center">
        Find Us Here
      </h2>
      <div className="max-w-[1295px] mx-auto w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden rounded-lg shadow-lg">
        <iframe
          title="Doctor's Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.6889211103844!2d28.056946575453015!3d-26.05475277716892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95739af792239f%3A0x9760d2503129cb11!2sRevival%20Medical%20Aesthetics!5e1!3m2!1sen!2sza!4v1731495494587!5m2!1sen!2sza"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
