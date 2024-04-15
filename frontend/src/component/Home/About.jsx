import React from "react";
import { BsDashLg } from "react-icons/bs";

const About = () => {
  return (
    <div className="relative p-4 dark:bg-gray-800">
      <div className="grid md:grid md:grid-flow-row-dense md:grid-cols-2 md:gap-12 md:items-center">
        <div className="md:col-start-2 md:pl-20">
          <div className="flex items-center gap-2 text-orange-600 text-2xl">
            <h4 className="text-xl font-extrabold leading-8 tracking-tight text-orange-600 sm:leading-9">
              About
            </h4>
            <BsDashLg />
          </div>
          <h1 className="text-2xl lg:text-4xl font-normal my-4">
            <span className="font-semibold">We Recommend</span>
            <br /> Stunning Destination and <br />
            Local Attractions
          </h1>
          <p>
            Let's choose your dream destinations here we provide many
            destinations, and we offer local tourist places every week.
          </p>

          <div className="flex-wrap  items-center gap-8 text-center sm:flex">
            <div className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
              <h3 className="py-2 text-2xl font-semibold text-gray-700 sm:text-xl">
                20+
              </h3>
              <p className="text-gray-500 text-md dark:text-gray-200">
                Destinations
              </p>
            </div>
            <div className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
              <h3 className="py-2 text-2xl font-semibold text-gray-700 sm:text-xl">
                30+
              </h3>
              <p className="text-gray-500 text-md dark:text-gray-200">Tourist</p>
            </div>
            <div className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
              <h3 className="py-2 text-2xl font-semibold text-gray-700 sm:text-xl">
                5+
              </h3>
              <p className="text-gray-500 text-md dark:text-gray-200">
                Years Experience
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-10 -mx-4 md:-mx-12 lg:mt-0 md:col-start-1">
          <img
            src="public/assets/images/rome.jpg"
            alt="illustration"
            className="relative mx-auto rounded shadow-lg w-full md:w-56 lg:w-72"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
