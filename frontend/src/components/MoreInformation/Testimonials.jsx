import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah W.",
      review:
        "The PRP treatment completely revitalized my skin. I couldn't be happier with the results!",
      imageUrl: "/images/testimonial-sarah.jpg",
    },
    {
      name: "Michael D.",
      review:
        "After years of joint pain, the treatments here have given me a new lease on life. Thank you!",
      imageUrl: "/images/testimonial-michael.jpg",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-100">
      <h2 className="text-h2 font-cormorant text-darkgreen mb-6 text-center">
        Success Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <p className="text-h3 font-cormorant text-darkgreen mb-2">
                {testimonial.name}
              </p>
              <p className="text-p text-gray-600">{testimonial.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
