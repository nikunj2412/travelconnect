import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LuCopy } from "react-icons/lu";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const TorismPlaceDetails = () => {
  const params = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  const getPlaceData = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/localTourism/getLocalTourismPost/${params.id}`);
      const data = await response.json();

      if (data.status === "Success") {
        setPlaceData(data.data);
        setLoading(false);
      } else {
        setError(data.message || "Failed to fetch place details.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching place data:", error);
      setError("Something went wrong while fetching place details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPlaceData();
    }
  }, [params.id]);

  return (
    <div className="w-full">
      {loading && <p className="text-center font-semibold" id="loading">Loading...</p>}
      
      {placeData && !loading && !error && (
        <>
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-2xl text-center font-bold capitalize">{placeData.placeName}</p>
            <div className="flex items-center justify-center">
              <div className="z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                <LuCopy
                  className="text-slate-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                />
              </div>
              {copied && (
                <p className="fixed top-[35%] right-[32%] z-10 rounded-md bg-slate-100 p-2">
                  Link copied!
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              {placeData.placeImages.map((imageUrl, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="h-[400px]"
                    style={{
                      background: `url(${imageUrl}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="w-full mx-auto flex flex-col justify-center p-5 max-w-6xl gap-2">
              <div className="flex flex-col">
                <h2>Package Description</h2>
                <p>{placeData.placeDescription}</p>
              </div>

              <div className="w-full flex flex-col mt-2">
                <h4 className="text-xl">Location:</h4>
                <p>{placeData.location}</p>
              </div>

              <div className="w-full flex flex-col mt-2">
                <h4 className="text-xl">Activity:</h4>
                <p>{placeData.placeActivity}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default TorismPlaceDetails;
