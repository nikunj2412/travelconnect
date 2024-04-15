import React from "react";
import data from "../../data.js"; 

const TopDestination = () => {
  return (
    <>
    <h2 className="text-2xl md:text-4xl text-center mt-8 md:mt-12">Top International Destination</h2>
    <p className="text-gray-400 my-5 text-center">Travel the world with our seamless <br/>booking experience.</p>
    <div className="from-blue-50 to-violet-50 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {data.map((destination) => (
            <div
              key={destination.id}
              className="shadow-md rounded-lg"
            >
              <img
                className="rounded-t-lg"
                src={destination.imageUrl}
                alt={destination.name}
              />
              <div className="p-4">
                <h3 className="text-gray-600 font-medium text-xl tracking-tight">
                  {destination.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-normal text-gray-900">
                  ${destination.price}
                  </span>
                  <a
                    href="#"
                    className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
                   View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default TopDestination;





