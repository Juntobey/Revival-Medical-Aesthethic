import React, { useState } from "react";
import { Link } from "react-router-dom";

export function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      imageUrl: `${process.env.PUBLIC_URL}/gp-treatment.jpg`,
      title: "GP Treatments",
      description: "Joint pain, vitamin boosts, general wellness.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      title: "Aesthetic Treatments",
      description: "Hair loss, skincare, PRP treatments.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
      title: "Drips & PRP Treatments",
      description: "Rejuvenating treatments to enhance overall health.",
    },
  ];

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-10 pb-[400px]">
      {/* Section Header */}
      <h2 className="text-center text-h2 font-bold font-headers  text-darkgreen mb-[50px]">
        Explore Our Range of Services
      </h2>
      <p className="text-center font-headers text-2xl font-semibold text-darkgreen mb-[100px]">
        Tailored Just For You.
      </p>

      {/* Carousel Container */}
      <div className="relative w-full max-w-2xl mx-auto">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-80 object-cover rounded-xl"
            />
            {/* Overlay with Content */}
            <div className="absolute bottom-0 left-0 w-full bg-transparent p-4 text-darkgreen font-paragraph text-center">
              <h3 className="text-2xl font-semibold text-darkgreen">
                {slide.title}
              </h3>
              <p className="text-p mt-2 font-paragraph">{slide.description}</p>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPreviousSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-darkgreen/50 p-2 rounded-full text-white"
        >
          &#10094;
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-darkgreen/50 p-2 rounded-full text-white"
        >
          &#10095;
        </button>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/more-information"
          className="bg-darkgreen text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
