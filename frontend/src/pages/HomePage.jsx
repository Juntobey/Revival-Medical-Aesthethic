import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Left Image Section */}
      <div
        className="relative bg-cover bg-center h-screen hidden md:block"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/model-image.jpeg')`,
        }}
      ></div>

      {/* Right Content Section */}
      <div className="grid grid-rows-2 gap-0 h-screen md:px-0">
        {/* Top Section with Title */}
        <div
          className="relative bg-cover bg-center h-full"
          style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/silk-image.jpeg')`,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-1">
            <h1 className="text-almond md:text-[170px] text-[150px] font-headers font-bold ">
              revival
            </h1>
            <p className="text-almond text-[20px] font-headers font-semibold mt-0 tracking-wide leading-relaxed">
              MEDICAL AESTHETICS
            </p>
          </div>
        </div>

        {/* Bottom Section with Three Images */}
        <div className="grid grid-cols-3 h-full">
          {/* Virtual Clinic image */}
          <div
            className="relative bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL}/v-clinic.jpg')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => handleNavigate("/virtual-clinic")}
                className=" ml-[10px] px-4 py-2 bg-black text-almond font-cta rounded-full shadow-md hover:bg-almond hover:text-black animate-bounce"
              >
                VIRTUAL CLINIC
              </button>
            </div>
          </div>

          {/* 2nd Bottom Image */}
          <div
            className="relative bg-cover bg-center"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL}/a-clinic.jpeg')`,
            }}
          ></div>

          {/* Aesthetics Clinic Image */}
          <div
            className="relative bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL}/middle.jpeg')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => handleNavigate("/aesthetics-clinic")}
                className="mr-[10px] px-4 py-2 bg-black text-almond font-cta rounded-full shadow-md hover:bg-almond hover:text-black animate-bounce"
              >
                AESTHETICS CLINIC
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
