import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Left Section with Model Image */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/model-image.jpeg')`,
        }}
      ></div>

      {/* Right Section */}
      <div className="grid grid-rows-2 gap-0 h-screen">
        {/* Top Silk Image with Overlay Text */}
        <div
          className="relative bg-cover bg-center h-full"
          style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/silk-image.jpeg')`,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-1">
            <h1 className="text-almond text-[170px] font-headers font-bold ">
              revival
            </h1>
            <p className="text-almond text-[20px] font-headers font-semibold mt-0 tracking-wide leading-relaxed">
              MEDICAL AESTHETICS
            </p>
          </div>
        </div>

        {/* Bottom Section with Three Images */}
        <div className="grid grid-cols-3 h-full">
          {/* Virtual Clinic */}
          <div
            onClick={() => handleNavigate("/virtual-clinic")}
            className="relative bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL}/v-clinic.jpg')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="px-4 py-2 bg-black text-almond font-cta rounded-full shadow-md hover:bg-almond hover:text-black">
                VIRTUAL CLINIC
              </button>
            </div>
          </div>

          {/* Coming Soon */}
          <div
            className="relative bg-cover bg-center"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL}/a-clinic.jpeg')`,
            }}
          ></div>

          {/* Aesthetics Clinic */}
          <div
            onClick={() => handleNavigate("/aesthetics-clinic")}
            className="relative bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: `url('${process.env.PUBLIC_URL}/middle.jpeg')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="px-4 py-2 bg-black text-almond font-cta rounded-full shadow-md hover:bg-almond hover:text-black">
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
