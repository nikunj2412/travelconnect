import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoLocation } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const TourismPlaces = () => {
  const [places, setplaces] = useState([]);
  const { loggedUser } = useSelector((state) => state.user);
  let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/localTourism/getAllApprovedTourismPost`);
        setplaces(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("palces",places)
return (
  <>
  <h2 className="text-2xl md:text-4xl text-center mt-8 md:mt-12">Local Tourism Places</h2>
  <p className="text-gray-400 my-5 text-center">Travel the world with our seamless <br/>booking experience.</p>
  <div className='flex justify-end mx-6 my-3'>
    {loggedUser ? (
          <Link to={`/add-local-tourism-place`}>
          <button className="px-4 py-3 flex items-center gap-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-green-700 shadow-md focus:ring-2" >Add Local Place<span className='text-2xl'><IoAddCircleOutline /></span></button>
          </Link>
        ) : (
          <Link to="/signin">
          </Link>
        )}       
  </div>
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
                <h3 className="text-gray-600 px-4 font-medium text-xl tracking-tight">
                  {localPlaces.placeName.length > 22 ? `${localPlaces.placeName.substring(0, 22)}...` : localPlaces.placeName}
                </h3>
                <div className="flex items-center justify-between">
                  <div className='flex gap-2 items-center'>
                <IoLocation/><span className="text-xl font-normal text-gray-900">
                {localPlaces.location.length > 18 ? `${localPlaces.location.substring(0, 18)}...` : localPlaces.location}
                  </span>
                  </div>
                  <Link to={`/add-local-tourism-place/${localPlaces.id}`} className="w-max">
                  <a
                    className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
                   View Details
                  </a>
                  </Link> 
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
