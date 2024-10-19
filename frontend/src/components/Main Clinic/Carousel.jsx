import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      title: "Treatment1",
      description: "Treatment1 details and short description",
      imageUrl: "/images/treatment1.jpg", // Adjust with your image paths
    },
    {
      title: "Treatment2",
      description: "Treatment2 details and short description",
      imageUrl: "/images/treatment2.jpg",
    },
    {
      title: "Treatment3",
      description: "Treatment3 details and short description",
      imageUrl: "/images/treatment3.jpg",
    },
    {
      title: "Treatment4",
      description: "Treatment4 details and short description",
      imageUrl: "/images/treatment4.jpg",
    },
  ];

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative py-10">
      <h2 className="text-center text-4xl text-h2 font-headers text-darkgreen mb-12">
        Explore Our Range of Services,
        <br /> Tailored Just For You.
      </h2>

      <div className="flex justify-center items-center space-x-4">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevClick}
          className="absolute top-20 right-32 z-10 bg-transparent p-2 "
        >
          <FaArrowLeft className="text-darkgreen-500 text-2xl" />
        </button>

        {/* Carousel Items */}
        <div className="flex justify-center space-x-8 relative">
          {items.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 transform translate-y-0 scale-105"
                  : "opacity-50 transform translate-y-6"
              }`}
            >
              <div className="bg-lightbrown shadow-lg rounded-lg overflow-hidden p-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-center text-2xl text-h3 font-headers text-darkgreen mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-center text-darkgreen text-p">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNextClick}
          className="absolute top-20 right-16 z-10 bg-transparent p-2"
        >
          <FaArrowRight className="text-darkgreen-500 text-2xl" />
        </button>
      </div>

      {/* Learn More Button */}
      <div className="flex justify-center mt-12 pt-10">
        <Link
          to="/more-information" // Assuming this is the route for the More Information page
          className="bg-darkgreen text-luxwhite font-cta font-semibold  px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default Carousel;
