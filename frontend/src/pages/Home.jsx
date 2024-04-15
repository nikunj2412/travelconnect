import React from "react";
import HeroBanner from "../component/Home/HeroBanner";
import About from "../component/Home/About";
import Features from "../component/Home/Features";

const Home = () => {
  return (
    <>
    <div className="home-container">
        <HeroBanner/>
        <About/>
        <Features/>
    </div>
    </>
  );
};

export default Home;
