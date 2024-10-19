import React from "react";
import VirtualOp1 from "../components/Virtual Clinic/VirtualOp1";
import Footer from "../components/Includes/Footer";
import Header from "../components/Includes/Header";
import VirtualOp2 from "../components/Virtual Clinic/VirtualOp2";
import VirtualOp3 from "../components/Virtual Clinic/VirtualOp3";
import BookingProcess from "../components/BookingProcess";
import VirtualPrice1 from "../components/Virtual Clinic/VirtualPrice1";
import VirtualPrice2 from "../components/Virtual Clinic/VirtualPrice2";
import VirtualPrice3 from "../components/Virtual Clinic/VirtualPrice3";
import FAQ from "../components/FAQ";
import MapSection from "../components/MapSection";
import CTASection from "../components/CTASection";

const VirtualClinic = () => {
  return (
    <>
      <Header />
      <div className="pt-19">
        <VirtualOp1 />
        <VirtualOp2 />
        <VirtualOp3 />
        <BookingProcess />
        <VirtualPrice1 />
        <VirtualPrice2 />
        <VirtualPrice3 />
        <FAQ />
        <CTASection />
        <MapSection />
        <Footer />
      </div>
    </>
  );
};

export default VirtualClinic;
