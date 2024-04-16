import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const ContactUs = () => {
  const { loggedUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
      firstName: loggedUser ? loggedUser.firstName : '',
      lastName: loggedUser ? loggedUser.lastName : '',
      email: loggedUser ? loggedUser.email : '',
      message: ''
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { firstName, lastName, email, message } = formData;
    
        if (!firstName || !lastName || !email || !message) {
          toast.error('All fields are required!');
          return;
        }
    
        try {
          let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
          const response = await fetch(`${apiUrl}/v1/contactus/createContactus`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit form');
          }
    
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
          });
    
          toast.success('Request submitted successfully!');
        } catch (error) {
          toast.error('Failed to submit Request. Please try again.');
        }
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
    
  console.log("formData",formData)
  return (
<div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-6">
  <div className="bg-white max-w-4xl mx-auto w-full">
    <div className="grid grid-cols-6 h-full">
      <div className="bg-blue-900 p-10 col-span-2">
        <h2 className="mb-10 font-bold text-2xl text-blue-100">Contact Info</h2>
        <p className="font-bold text-orange-500 py-8 border-b border-blue-700">
          Location Address
          <span className="font-normal text-xs text-blue-300 block">Kitchener City, Canada</span>
        </p>
        <p className="font-bold text-orange-500 py-8 border-b border-blue-700">
          Phone Number
          <span className="font-normal text-xs text-blue-300 block">+1 (123) 456 789</span>
        </p>
        <p className="font-bold text-orange-500 py-8 border-b border-blue-700">
          Email Address
          <span className="font-normal text-xs text-blue-300 block">support@travelconnect.com</span>
        </p>
      </div>
      <div className="bg-blue-50 p-14 col-span-4">
        <h2 className="mb-14 font-bold text-4xl text-orange-600">Raise a Request</h2>
        <div className="grid gap-6 mb-6 grid-cols-2">
          <div className="flex flex-col">
            <input className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base  text-gray-500 outline-none focus:border-orange-500 focus:shadow-md"
            placeholder="Firstname"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!!loggedUser}
            />
          </div>
          <div className="flex flex-col">
            <input className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base text-gray-500 outline-none focus:border-orange-500 focus:shadow-md"
            placeholder="Lastname"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange} 
            disabled={!!loggedUser}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 grid-cols-2">
          <div className="flex flex-col">
            <input className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base text-gray-500 outline-none focus:border-orange-500 focus:shadow-md"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!!loggedUser}
             />
          </div>
        </div>
        <div className="mb-6">
          <textarea className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base text-gray-500 outline-none focus:border-orange-500 focus:shadow-md" placeholder="Your message" rows="8"  name="message"
            value={formData.message}
            onChange={handleChange}></textarea>
        </div>
        <div className="flex justify-center">
        <button 
           onClick={handleSubmit}
          className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-orange-600 shadow-md focus:ring-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ContactUs

