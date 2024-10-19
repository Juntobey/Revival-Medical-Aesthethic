import React from "react";

const CarouselItem = ({ image, title, description }) => {
  return (
    <div className="carousel-item p-4  rounded-lg shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded-t-lg"
      />
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="bg-luxwhite text-darkgreen py-2 px-4 rounded hover:bg-gray-800">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CarouselItem;
