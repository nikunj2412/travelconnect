import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LuCopy } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import RatingCard from "./RatingCard";
import { toast } from 'react-toastify';


const Package = () => {
  const { loggedUser } = useSelector((state) => state.user);
  console.log("Logged User", loggedUser);
  const params = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [packageRatings, setPackageRatings] = useState([]);
  const [checkRating, setCheckRating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: "",
    postId: params?.id,
    userRef: loggedUser?.id,
    username: loggedUser?.firstName,
    userProfileImg: loggedUser?.profileImg,
  });
  let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  console.log("Pack data", packageData);
  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${apiUrl}/v1/admin/post/${params?.id}`
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

  console.log("review Data ===", reviewData);

  useEffect(() => {
    if (params.id) {
      getPackageData();
      getRatings();
    }
  }, [params.id]);

  console.log("PR",packageRatings)
  const getRatings = async () => {
    try {
      console.log(params.id)
      const res = await fetch(`${apiUrl}/v1/rating/getRatingForPackage/${params.id}`);
      const data = await res.json();
      if (data) {
        setPackageRatings(data.data);
      } else {
        setPackageRatings("No ratings yet!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkRatingGiven = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/v1/rating/ratingGiven/${loggedUser?.id}/${params?.id}`
      );
      const data = await res.json();
      setCheckRating(data?.data?.flag);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRating = async () => {
    // checkRatingGiven();
    // console.log("Checkrating", checkRating)
    // if(checkRating){
    //   toast.warn("Already Submitted Rating");
    //   return;
    // }
    if (reviewData.rating === 0 && reviewData.review === "") {
      toast.error("Atleast 1 field is required!");
      return;
    }
    if (
      reviewData.rating === 0 &&
      reviewData.review === "" &&
      !reviewData.userRef
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/v1/rating/giveRating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      console.log("DATA", data);
      if (data?.status === "Success") {
        toast.success("Review Added");
        getRatings();
        setReviewData({
          rating: 0,
          review: ""
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      {loading && (
        <p className="text-center font-semibold" id="loading">
          Loading...
        </p>
      )}
      {packageData && !loading && !error && (
        <>
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-2xl text-center font-bold capitalize">
              {packageData?.packageName}
            </p>
            <div className="flex items-center justify-center ">
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
            <div className="w-full mx-auto flex flex-col justify-center p-5 max-w-6xl gap-2">
              <div className="flex flex-col">
                <h2>Package Description</h2>
                <p>{packageData?.packageDescription}</p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:gap-7">
                <div className="w-full flex flex-col mt-2">
                  <h4 className="text-xl">Inclusions:</h4>
                  <ul>
                    {packageData?.inclusion.split(".").map((item, index) => (
                      <li className="list-disc" key={index}>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full flex flex-col mt-2">
                  <h4 className="text-xl">Exclusions:</h4>
                  <ul>
                    {packageData?.exclusion.split(".").map((item, index) => (
                      <li className="list-disc" key={index}>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
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
                onClick={() => {
                  if (loggedUser) {
                    navigate(`/booking/${params?.id}`);
                  } else {
                    navigate("/signin");
                  }
                }}
                className="w-full sm:w-[200px] bg-green-700 text-white rounded p-3 hover:opacity-95"
              >
                Book Now
              </button>
            </div>

            
              {/* give rating/review */}
              <div className="w-full flex gap-4 flex-col mt-2 items-center">
                {loggedUser ? (
                  <>
                  {packageRatings && (
                  <>
                    <h4 className="text-xl">Rating :</h4>
                    <Rating
                      name="simple-controlled"
                      className="w-max"
                      value={reviewData?.rating}
                      onChange={(e, data) => {
                        setReviewData({
                          ...reviewData,
                          rating: data,
                        });
                      }}
                    />
                    <h4 className="text-xl">Post a Review :</h4>
                    <textarea
                      className="w-full resize-none p-3 border border-gray-500 rounded"
                      rows={3}
                      placeholder="Review"
                      value={reviewData?.review}
                      onChange={(e) => {
                        setReviewData({
                          ...reviewData,
                          review: e.target.value,
                        });
                      }}
                    ></textarea>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRating();
                      }}
                      className=" p-2 bg-green-700 text-white rounded disabled:opacity-80 hover:opacity-95"
                    >
                      Submit
                    </button>
                    <hr />
                    <div className="mt-3 w-full flex flex-wrap justify-center gap-2 sm:justify-normal"></div>
                    <div className="mt-3 w-full flex flex-col flex-wrap justify-center gap-2 sm:justify-normal">
                  <RatingCard packageRatings={packageRatings} />
                </div>
                  </>
                )}
                  </>
                ):(
                <>
                <div className="mt-3 w-full flex flex-col flex-wrap justify-center gap-2 sm:justify-normal">
                  <RatingCard packageRatings={packageRatings} />
                </div>
                <div className="mt-8">
                <button
                  onClick={() => {
                    navigate('/signin');
                  }}
                  className="p-2 rounded text-white bg-green-700"
                >
                  Rate Package
                </button>
              </div>
                </>
                
            )}
          </div>

                {/* <div className="mt-3 w-full flex flex-col flex-wrap justify-center gap-2 sm:justify-normal">
                  <RatingCard packageRatings={packageRatings} />
                </div>
                {(!loggedUser || loggedUser === null) && (
                  <button
                    onClick={() => {
                      navigate("/signin");
                    }}
                    className="p-2 rounded text-white bg-green-700"
                  >
                    Rate Package
                  </button>
                )}
              </div> */}
              {/* give rating/review */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Package;
