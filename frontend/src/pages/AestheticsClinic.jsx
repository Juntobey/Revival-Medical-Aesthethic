import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import NewsletterSection from "../components/NewsletterSection";
import TreatmentGallery from "../components/TreatmentGallery";

const AestheticsClinic = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <TreatmentGallery />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default AestheticsClinic;
