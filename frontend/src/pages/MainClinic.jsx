import React from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import HeroSection from "../components/Main Clinic/HeroSection.jsx";
import FAQ from "../components/FAQ.jsx";
import TreatmentGallery from "../components/TreatmentGallery";
import DoctorIntro from "../components/Main Clinic/DoctorIntro.jsx";
import { CarouselSection } from "../components/Main Clinic/CarouselSection.jsx";

import BookingProcess from "../components/BookingProcess.jsx";
import CTASection from "../components/CTASection.jsx";
import MapSection from "../components/MapSection.jsx";

const MainClinic = () => {
  return (
    <>
      <Header />
      <div className="pt-19">
        <HeroSection />
        <DoctorIntro />
        <CarouselSection />
        <BookingProcess />
        <TreatmentGallery />
        <FAQ />
        <CTASection />
        <MapSection />
        <Footer />
      </div>
    </>
  );
};

export default MainClinic;
