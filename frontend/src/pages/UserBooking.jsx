import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserBooking = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const params = useParams();
console.log("PARAMs",params.id)
let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/booking/getBookinByUserId/${params.id}`);
        const data = await response.json();
        console.log("Data user",data)
        setBookingDetails(data.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [params.id]);

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/v1/booking/deleteBookingById/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
            setBookingDetails(bookingDetails.filter(bookingDetails => bookingDetails.id !== id));
          toast.success('Package Cancelled');
        } else {
          toast.error('Failed to cancel package',{
            autoClose: 3000});
        }
      } catch (error) {
        console.error('Error canceling package:', error);
      }
    };
  return (
    <div className="container mx-auto my-7">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr>
          <th className="text-left border border-gray-300 px-4 py-2">Package Images</th>
            <th className="text-left border border-gray-300 px-4 py-2">Package Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">First Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">Email</th>
            <th className="text-left border border-gray-300 px-4 py-2">Date</th>
            <th className="text-left border border-gray-300 px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((booking, index) => (
            <tr key={index} className="border-b border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  <img src={booking?.postId?.packageImages[0]} alt="Image" className="w-16 h-16 object-cover rounded-full mr-2" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{booking.postId.packageName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.userId.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.userId.email}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-red-600 text-white px-3 py-2 rounded-lg" onClick={() => handleDelete(booking.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBooking;
