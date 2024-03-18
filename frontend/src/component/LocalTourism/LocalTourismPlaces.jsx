import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TourismPlaces = () => {
  const [places, setplaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/v1/localTourism/getAllApprovedTourismPost');
        setplaces(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

return (
  <>
  <h2 className="text-2xl md:text-4xl text-center mt-8 md:mt-12">Local Tourism Places</h2>
  <p className="text-gray-400 my-5 text-center">Travel the world with our seamless <br/>booking experience.</p>
  <div className="from-blue-50 to-violet-50 flex items-center justify-center">
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {places.map((localPlaces) => (
          <div
            key={localPlaces.id}
            className="shadow-md rounded-lg"
          >
            <img
              className="rounded-t-lg"
              src={localPlaces.placeImages}
              alt={localPlaces.placeName}
            />
            <div className="p-4">
              <h3 className="text-gray-600 font-medium text-xl tracking-tight">
                {localPlaces.placeName}
              </h3>
              <div className="flex items-center justify-between">
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

export default TourismPlaces;
