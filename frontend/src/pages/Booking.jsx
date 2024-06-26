import React, { useEffect, useState } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';

const Booking = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    packagePrice: "",
    location: "",
    packageDays: "",
    packageNights: "",
    packageActivity: "",
    inclusion: "",
    exclusion: "",
    packageImages: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [carts,setCarts] = useState([]);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    postId: null,
    userId: null,
    person: 1,
    date: null,
  });
  const [currentDate, setCurrentDate] = useState("");
  let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  console.log("BookingData",bookingData)
  const getPackageData = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/v1/admin/post/${params?.id}`
      );
      const data = await res.json();
      console.log("DATA", data);
      if (data?.status === "Success") {
        setPackageData(data?.data);
        console.log(packageData);
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

  const handlePayment = async () => {

    if (
      bookingData.postId === "" ||  
      bookingData.userId === "" ||
      bookingData.totalPrice <= 0 ||
      bookingData.person <= 0
    ) {
      toast.error("All fields are required!");
      return;
    }
    if(bookingData.date === null){
      toast.error("Please select booking date");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/v1/booking/createBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      toast.success("successfully booked package")
       // Update carts with the latest booking details
       setCarts([
        ...carts,
        {
          price: packageData.packagePrice,
          name: packageData.packageName,
          person: bookingData.person,
        }
      ]);

      console.log("Booked item added to carts:", carts);
    const stripe = await loadStripe(`${import.meta.env.VITE_PAYMENT_KEY}`);
    const body = {
      packages : carts
  }
  const headers = {
      "Content-Type":"application/json"
  }
  const response = await fetch(`${apiUrl}/v1/stripe/createSession`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
  });



  const session = await response.json();

  console.log("session",session)
  const result = stripe.redirectToCheckout({
      sessionId:session.data.id
  });
  
  if(result.error){
      console.log(result.error);
  }
  } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

  // const handleBookPackage = async () => {
  //   if (
  //     bookingData.postId === "" ||  
  //     bookingData.userId === "" ||
  //     bookingData.totalPrice <= 0 ||
  //     bookingData.person <= 0
  //   ) {
  //     toast.error("All fields are required!");
  //     return;
  //   }
  //   if(bookingData.date === null){
  //     toast.error("Please select booking date");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const res = await fetch(`http://localhost:3333/v1/booking/createBooking`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingData),
  //     });
  //     const data = await res.json();
  //     toast.success("successfully booked package")
  //     setCarts([
  //       ...carts,
  //       {
  //         price: bookingData.totalPrice,
  //         name: packageData.packageName,
  //         person: bookingData.person,
  //       }
  //     ]);

  //     console.log("Booked item added to carts:", carts);
  //     console.log("Bookkkk",data)
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (params?.id) {
      console.log("PARAMS", params.id);
      getPackageData();
    }
    let date = new Date().toISOString().substring(0, 10);
    let d = date.substring(0, 8) + (parseInt(date.substring(8)) + 1);
    setCurrentDate(d);
  }, [params?.id]);

  useEffect(() => {
    if (packageData && params?.id) {
      setBookingData({
        ...bookingData,
        postId: params?.id,
        userId: loggedUser?.id,
        totalPrice: packageData?.packageDiscountPrice
          ? packageData?.packageDiscountPrice * bookingData?.person
          : packageData?.packagePrice * bookingData?.person,
      });

      setCarts([
        {
          price: packageData.packagePrice,
          name: packageData.packageName,
          person: bookingData.person,
        }
      ]);
    }
  }, [packageData, params,bookingData.totalPrice]);

  console.log("CARTS",carts)
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] flex flex-col items-center p-6 rounded shadow-2xl gap-3">
        <h1 className="text-center font-bold text-2xl my-4">Book Package</h1>
        {/* user info */}
        <div className="w-full flex flex-wrap justify-center gap-2">
          <div className="pr-3 md:border-r md:pr-6">
            <div className="flex flex-col p-2 w-64 xsm:w-72 h-fit gap-2">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="p-1 rounded border border-black"
                  value={loggedUser.firstName}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-1 rounded border border-black"
                  value={loggedUser.email}
                  disabled
                />
              </div>
              
            </div>
          </div>
          {/* package info */}
          <div className="pl-3 md:border-l md:pl-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center flex-wrap gap-4">
                <img
                  className="w-52"
                  src={packageData.packageImages[0]}
                  alt="Package image"
                />
                <div>
                  <p className="font-semibold text-lg mb-1 capitalize">
                    {packageData.packageName}
                  </p>
                  <p className="flex gap-2 text-green-700 font-semibold capitalize">
                    <FaMapMarkerAlt /> {packageData.location}
                  </p>
                  {/* days & nights */}
                  {(+packageData.packageDays > 0 ||
                    +packageData.packageNights > 0) && (
                    <p className="flex items-center gap-2">
                      <FaClock />
                      {+packageData.packageDays > 0 &&
                        (+packageData.packageDays > 1
                          ? packageData.packageDays + " Days"
                          : packageData.packageDays + " Day")}
                      {+packageData.packageDays > 0 &&
                        +packageData.packageNights > 0 &&
                        " - "}
                      {+packageData.packageNights > 0 &&
                        (+packageData.packageNights > 1
                          ? packageData.packageNights + " Nights"
                          : packageData.packageNights + " Night")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-1">
                <label className="font-semibold" htmlFor="date">
                  Select Date:
                </label>
                <input
                  type="date"
                  min={currentDate !== "" ? currentDate : ""}
                  //   min={"2024-01-23"}
                  id="date"
                  className="w-max border rounded"
                  onChange={(e) => {
                    setBookingData({ ...bookingData, date: e.target.value });
                  }}
                />
              </div>
              {/* price */}
              <p className="flex text-xl font-semibold my-1 items-center gap-4">
                Price:
                {packageData.packageOffer ? (
                  <>
                    <span className="line-through text-gray-700">
                      ${packageData.packagePrice}
                    </span>{" "}
                    -<span>${packageData.packageDiscountPrice}</span>
                    <span className="text-lg ml-2 bg-green-700 p-1 rounded text-white">
                      {Math.floor(
                        ((+packageData.packagePrice -
                          +packageData.packageDiscountPrice) /
                          +packageData.packagePrice) *
                          100
                      )}
                      % Off
                    </span>
                  </>
                ) : (
                  <span className="text-green-700">
                    ${packageData.packagePrice}
                  </span>
                )}
              </p>
              {/* price */}
              <div className="flex text-xl items-center gap-4 font-semibold my-1">
                Person:
              <div className="flex border-2 w-max">
                <button
                  className="p-2 py-1 font-semibold"
                  onClick={() => {
                    if (bookingData.person > 1) {
                      setBookingData({
                        ...bookingData,
                        person: (bookingData.person -= 1),
                        totalPrice: packageData.packageDiscountPrice
                          ? packageData.packageDiscountPrice *
                            bookingData.person
                          : packageData.packagePrice * bookingData.person,
                      });
                    }
                  }}
                >
                  -
                </button>
                <input
                  value={bookingData.person}
                  disabled
                  type="text"
                  className="border w-10 text-center text-lg"
                />
                <button
                  className="p-2 py-1 font-semibold"
                  onClick={() => {
                    if (bookingData.person < 10) {
                      setBookingData({
                        ...bookingData,
                        person: (bookingData.person += 1),
                        totalPrice: packageData.packageDiscountPrice
                          ? packageData.packageDiscountPrice *
                            bookingData.person
                          : packageData.packagePrice * bookingData.person,
                      });
                    }
                  }}
                >
                  +
                </button>
              </div>
              </div>
              <p className="flex text-xl font-semibold items-center gap-4">
                Total Price:
                <span className="text-green-700">
                  $
                  {packageData.packageDiscountPrice
                    ? packageData.packageDiscountPrice * bookingData.person
                    : packageData.packagePrice * bookingData.person}
                </span>
              </p>
              <div>
          {/* <button 
           onClick={handleBookPackage}
          className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-green-700 shadow-md focus:ring-2">
           Booking
          </button> */}
          <button 
           onClick={handlePayment}
          className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-green-700 shadow-md focus:ring-2">
            Check Out
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
