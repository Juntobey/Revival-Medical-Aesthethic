import React, { useState, useEffect } from "react";
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
      imageUrl: `${process.env.PUBLIC_URL}/aesthetic-treatment.jpg`,
      title: "Aesthetic Treatments",
      description: "Hair loss, skincare, PRP treatments.",
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/drip1.jpg`,
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

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="py-10 pb-[64px] shadow-lg">
      {/* Section Header */}
      <h2 className="text-center text-h2 font-bold font-headers text-darkgreen mb-[15px]">
        Explore Our Range of Services
      </h2>
      <p className="text-center font-paragraph text-xl font-semibold text-darkgreen mb-[150px]">
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
              style={{ objectFit: "cover" }}
            />
            {/* Overlay with Content */}
            <div className="absolute bottom-0 left-0 w-full bg-transparent p-4 text-darkgreen font-paragraph text-center">
              <h3 className="text-3xl font-headers font-semibold text-darkgreen">
                {slide.title}
              </h3>
              <p className="text-p mt-2 font-paragraph">{slide.description}</p>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPreviousSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-darkgreen/50 p-2 rounded-full text-luxwhite"
        >
          &#10094;
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-darkgreen/50 p-2 rounded-full text-luxwhite"
        >
          &#10095;
        </button>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-[500px]">
        <Link
          to="/more-information"
          className="bg-darkgreen text-almond font-cta py-2 px-6 rounded-md font-semibold transition-opacity duration-300 hover:opacity-80 focus:outline-none"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
