import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUp = () => {
 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values,{ resetForm }) => {
      try {
      let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
        const response = await axios.post(`${apiUrl}/v1/user`, values,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
        );
        toast.success("User Created Successfully")
        console.log('API response:', response.data);
        resetForm();
      } catch (error) {
        toast.error('Error during API request:', error);
      }
    },
  });


  return (
    <div className="flex flex-wrap w-full bg-white">
    <div className="w-1/2 shadow-xl">
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
      <p className="text-3xl text-center">Register.</p>
      <form className="flex flex-col pt-3 md:pt-8" onSubmit={formik.handleSubmit}>
        
      <div className="flex flex-col pt-4">
          <div className="flex relative flex-col">
            <label htmlFor="firstname">FirstName</label>
            <input
              type="text"
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              placeholder="FirstName"
            />
            {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500">{formik.errors.firstName}</div>
          )}
          </div>
        </div>

        <div className="flex flex-col pt-4">
          <div className="flex relative flex-col">
            <label htmlFor="lastname">LastName</label>
            <input
              type="text"
              name='lastName'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              placeholder="LastName"
            />
            {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500">{formik.errors.lastName}</div>
          )}
          </div>
        </div>
        
        <div className="flex flex-col pt-4">
          <div className="flex relative flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
          </div>
        </div>
        <div className="flex flex-col pt-4 mb-12">
          <div className="flex relative flex-col">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
          </div>
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
          Have an account?
          <Link to='/signin'
          className="font-semibold underline">
            Login here.
          </Link>
          
        </p>
      </div>
    </div>
  </div>
  
</div>
  )
}

export default SignUp