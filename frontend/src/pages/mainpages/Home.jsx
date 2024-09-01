import React from "react";
import Navbar from "./../../components/common/Navbar";
import HeroSection from "../../components/home/HeroSection";
import CategoryCarousel from "../../components/home/CategoryCarousel";
import LatestJobs from "../../components/home/LatestJobs";
import Footer from "./../../components/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
