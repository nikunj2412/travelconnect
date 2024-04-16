import React from "react";
import { PiAirplaneTakeoffBold } from "react-icons/pi";
import parashoot from '../../../public/assets/images/parashoot.jpg';
import lagoon from '../../../public/assets/images/lagoon.jpg';
import bali from '../../../public/assets/images/bali.jpg';
import mountain from '../../../public/assets/images/mountain.jpg';

const HeroBanner = () => {
  return (
    <div className="flex flex-col md:items-center md:flex-row lg:space-x-8 md:my-7">
      <section className="flex flex-col p-6 lg:p-12 flex-equal-column">
        <div className="flex gap-4 items-center">
          <PiAirplaneTakeoffBold className="hero-icon text-2xl lg:text-3xl" />
          <h3 className="font-semibold text-orange-600 text-lg lg:text-xl">
            Explore the World
          </h3>
        </div>
        <h1 className="text-3xl lg:text-5xl my-4">
          <span className="font-medium">Discover The </span>
          <br />
          Best Destinations
          <br /> In the World
        </h1>
        <p className="text-sm lg:text-base">
          Your gateway to simple pleasures and extraordinary escapes
          <br />
          explore the world effortlessly with our travel companion.
        </p>
      </section>
      <div className="relative mt-4 lg:mt-0 lg:col-start-1 lg:flex-equal-column lg:px-0 lg:py-0 lg:space-y-4">
        <div className="flex items-center justify-center space-x-4 md:justify-start md:items-end md:px-16">
          <img
            className="w-24 lg:w-52 rounded-lg shadow-lg"
            width="200"
            src={parashoot}
            alt="1"
          />
          <img
            className="w-32 lg:w-64 rounded-lg shadow-lg"
            width="260"
            src={lagoon}
            alt="2"
          />
        </div>
        <div className="flex items-center justify-center space-x-4 md:items-start md:justify-start md:my-4 md:mx-12">
          <img
            className="w-32 lg:w-56 rounded-lg shadow-lg"
            width="170"
            src={bali}
            alt="3"
          />
          <img
            className="w-32 lg:w-52 rounded-lg shadow-lg"
            width="200"
            src={mountain}
            alt="4"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
