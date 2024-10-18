import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import NewsletterSection from "../components/NewsletterSection";
import TreatmentGallery from "../components/TreatmentGallery";
import DoctorIntro from "../components/DoctorIntro";

const AestheticsClinic = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <DoctorIntro />
      <TreatmentGallery />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default AestheticsClinic;
