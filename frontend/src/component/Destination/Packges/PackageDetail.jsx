import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";

const Package = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3333/v1/admin/post/${params?.id}`
      );
      const data = await res.json();
      if (data?.status === "Success") {
        setPackageData(data?.data);
        setLoading(false);
      } else {
        setError(data?.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPackageData();
    }
  }, [params.id]);

  return (
    <div className="w-full">
      {loading && (
        <p className="text-center font-semibold" id="loading">
          Loading...
        </p>
      )}
      {packageData && !loading && !error && (
        <>
          <div className="flex items-center justify-center p-4">
            <p className="text-2xl text-center font-bold capitalize">
              {packageData?.packageName}
            </p>
            <p className="flex items-center mx-4">
              {packageData?.packageDays} Days / {packageData?.packageNights}{" "}
              Nights
            </p>
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

          <div className="w-full">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {packageData?.packageImages.map((imageUrl, i) => (
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
            {/* copy button */}
            <div className="w-full mx-auto flex flex-col justify-center p-5 max-w-6xl gap-2">
              <div className="flex flex-col">
                <h2>Package Description</h2>
                <p>{packageData?.packageDescription}</p>
              </div>

              <div className="flex">
                <div className="w-full flex flex-col mt-2">
                  <h4 className="text-xl">Inclusion:</h4>
                  <p>{packageData?.inclusion}</p>
                </div>
                <div className="w-full flex flex-col mt-2">
                  <h4 className="text-xl">Exclusion:</h4>
                  <p>{packageData?.exclusion}</p>
                </div>
              </div>

              <div className="w-full flex flex-col mt-2">
                <h4 className="text-xl">Activity:</h4>
                <p>{packageData?.packageActivity}</p>
              </div>

              <p className="flex gap-1 text-2xl font-semibold my-3">
                ${packageData?.packagePrice}
              </p>

              <div className="w-full flex justify-center sm:justify-normal">
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full sm:w-[200px] bg-green-700 text-white rounded p-3 hover:opacity-95"
                >
                  Book Now
                </button>
              </div>
              <hr />
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Package;
