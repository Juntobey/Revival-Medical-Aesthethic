import React from "react";

const MoreInfoHero = () => {
  return (
    <section
      className="relative flex justify-center items-center text-center h-[445px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/info-hero.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "650px",
      }}
    >
      <div className="absolute inset-0 bg-darkgreen opacity-40"></div>
      <div className="relative z-10 text-almond">
        <h1 className="text-h1 font-cormorant mb-4">
          Learn More About Our Treatments
        </h1>
        <p className="text-lg">
          Discover the services we offer and how they can improve your health
          and well-being.
        </p>
      </div>
    </section>
  );
};

export default MoreInfoHero;
