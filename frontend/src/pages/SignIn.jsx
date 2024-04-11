import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Enter Email"),
  password: Yup.string().required("Enter Password"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:3333/v1/user/userLogin",
          values
        );
        if (response.data.status === "Success") {
          toast.success("Authentication successful")
          console.log("Authentication successful",response.data.data.user);
          dispatch(loginSuccess(response?.data?.data?.user));
          const refreshToken = response?.data?.data?.token?.refresh?.token;
          console.log("Refresh Token", refreshToken)
        navigate("/");
        } else {
          toast.error("Authentication failed");
        }
        console.log("API Response", response.data);
        resetForm();
      } catch (error) {
        console.error("Error during API call", error);
      }
    },
  });

  return (
    <div className="flex flex-wrap w-full bg-white">
      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden md:w-3/5 md:mx-auto md:object-contain h-screen md:block"
          src="public/assets/images/login-bg.png"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
          <a href="#" className="p-4 text-xl font-bold text-white bg-black">
            Travel.
          </a>
        </div>
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">Welcome.</p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col pt-3 md:pt-8"
          >
            <div className="flex flex-col pt-4">
              <div className="flex relative ">
                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MdOutlineMail className="text-orange-600 text-xl" />
                </span>
                <input
                  type="text"
                  name="email"
                  autocomplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 px-12">{formik.errors.email}</div>
              )}
            </div>
            <div className="flex flex-col pt-4 mb-12">
              <div className="flex relative ">
                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <RiLockPasswordFill className="text-orange-600 text-xl" />
                </span>
                <input
                  type="password"
                  name="password"
                  autocomplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 px-12">{formik.errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-orange-600 shadow-md hover:text-orange-600 hover:bg-white focus:outline-none focus:ring-2"
            >
              <span className="w-full">Submit</span>
            </button>
          </form>
          <div className="pt-12 pb-12 text-center">
            <p>
              Don&#x27;t have an account?
              <Link to="/signup" className="font-semibold underline">
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
