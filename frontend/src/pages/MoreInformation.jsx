import React from "react";
import Header from "../components/Includes/Header";
import MoreInfoHero from "../components/MoreInformation/MoreInfoHero";
import AestheticTreatments from "../components/MoreInformation/AestheticTreatments";
import GPTreatments from "../components/MoreInformation/GPTreatments";
import VirtualConsultations from "../components/MoreInformation/VirtualConsultations";
import Testimonials from "../components/MoreInformation/Testimonials";
import FAQ from "../components/FAQ";
import MapSection from "../components/MapSection";
import Footer from "../components/Includes/Footer";

const MoreInformation = () => {
  return (
    <>
      <Header />
      <MoreInfoHero />
      <AestheticTreatments />
      <GPTreatments />
      <VirtualConsultations />
      <Testimonials />
      <FAQ />
      <MapSection />
      <Footer />
    </>
  );
};

export default MoreInformation;
