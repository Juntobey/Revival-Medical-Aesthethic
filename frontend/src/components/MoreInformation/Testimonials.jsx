import React, { useEffect, useState } from "react";
import BASE_URL from "../../config";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from the API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BASE_URL}/testimonials`);
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        setTestimonials(data.slice(-2));
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p>Loading testimonials...</p>;
  }

  const stripApiFromUrl = (url) => {
    return url.replace("/api", "");
  };

  return (
    <section className="py-16 px-8 bg-gray-100">
      <h2 className="text-h2 font-headers text-darkgreen mb-6 text-center">
        Success Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <img
              src={`${stripApiFromUrl(BASE_URL)}/${testimonial.imagePath}`}
              alt={`Testimonial ${index + 1}`}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <p className="text-h3 font-headers text-darkgreen mb-2">
                {"example name"}
              </p>
              <p className="text-p font-paragraph text-gray-600">
                {testimonial.testimonial}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
