import React, { useEffect, useState } from 'react';

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch booking data from API
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3333/v1/admin/getAllBookings');
        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="text-left border border-gray-300 px-4 py-2">ID</th>
            <th className="text-left border border-gray-300 px-4 py-2">Package Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">First Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">Email</th>
            <th className="text-left border border-gray-300 px-4 py-2">Date</th>
            <th className="text-left border border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
        {bookings.map((booking, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.postId.packageName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.userId.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.userId.email}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">${booking.totalPrice}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
