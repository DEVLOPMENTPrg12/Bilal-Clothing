import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero";
import SubscribeSection from "../components/Newsletter";
import Footer from "../components/Footer";


export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      < HeroSection/>
      <div>{children}</div>
      < SubscribeSection/>
      <Footer />
    </>
  );
}
