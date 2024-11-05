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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  return (
    <section className="relative py-10">
      <h2 className="text-center text-4xl text-h2 font-headers text-darkgreen mb-12">
        Explore Our Range of Services,
        <br /> Tailored Just For You.
      </h2>

      {/* Carousel Container */}
      <div className="relative overflow-hidden max-w-[1295px] mx-auto">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4" // Added gap-4 for spacing
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`min-w-[80%] max-w-[350px] transition-opacity duration-300 ${
                index === currentIndex ? "opacity-100" : "opacity-50"
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
      </div>

      {/* Previous and Next Arrows */}
      <div className="absolute top-[-10px] right-[10px] flex items-center space-x-4">
        <button
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          className={`p-2 bg-transparent transition-opacity ${
            currentIndex === 0 ? "opacity-50" : "opacity-100"
          }`}
        >
          <FaArrowLeft className="text-darkgreen-500 text-2xl" />
        </button>

        <button
          onClick={handleNextClick}
          disabled={currentIndex === items.length - 1}
          className={`p-2 bg-transparent transition-opacity ${
            currentIndex === items.length - 1 ? "opacity-50" : "opacity-100"
          }`}
        >
          <FaArrowRight className="text-darkgreen-500 text-2xl" />
        </button>
      </div>

      {/* Learn More Button */}
      <div className="flex justify-center mt-12 pt-10">
        <Link
          to="/more-information"
          className="bg-darkgreen font-cta text-luxwhite px-6 py-3 rounded-lg hover:bg-opacity-80 inline-block transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default Carousel;
