import React from "react";
import { BsDashLg } from "react-icons/bs";
import { GrPlan } from "react-icons/gr";
import { MdTravelExplore } from "react-icons/md";
import { FaRoute } from "react-icons/fa";

const Features = () => {
  return (
    <div className="flex sm:items-center my-10 mx-auto sm:px-9 flex-col sm:flex-row ">
      <div className="feature-detail">
        <div className="flex items-center gap-2 text-orange-600 text-2xl">
          <h4 className="text-xl font-extrabold leading-8 tracking-tight text-orange-600  sm:leading-9">
            Features
          </h4>
          <BsDashLg />
        </div>
        <h1 className="text-2xl sm:text-4xl font-normal my-4">
          <span className="font-semibold">Best Features</span>
          <br /> For You
        </h1>
        <p>
          We will provide the best feaures for those of you who want to travel
          comfortably
        </p>
      </div>

<div className="flex-wrap  items-center justify-end gap-4 sm:flex">
    <div className="w-full text-center px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 ">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-orange-400 rounded-md">
                <GrPlan className="text-white"/>
            </div>
        </div>
        <h3 className="py-4 font-semibold text-gray-700 text-xl ">
            Plan Your Trip
        </h3>
        <p className="text-gray-500 text-md ">
        Effortlessly plan your perfect journey with our seamless trip planning services.
        </p>
    </div>
    <div className="w-full text-center px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-orange-400 rounded-md">
            <MdTravelExplore/>
            </div>
        </div>
        <h3 className="py-4 text-xl font-semibold text-gray-700 ">
        Local Place Explorer
        </h3>
        <p className="text-gray-500 text-md ">
        Uncover hidden local tourist attractions effortlessly with our feature
        </p>
    </div>
    <div className="w-full px-4 py-4 text-center mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 ">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-orange-400 rounded-md">
                <FaRoute/>
            </div>
        </div>
        <h3 className="py-4 text-xl font-semibold text-gray-700 ">
            Best Destinations
        </h3>
        <p className=" text-gray-500 text-md ">
        Discover the best and well known travel destinations with our list of Top rated places.
        </p>
    </div>
</div>

    </div>
  );
};

export default Features;
