import React, { useEffect, useState } from 'react';
import Rating from "@mui/material/Rating";
import { toast } from 'react-toastify';

const UserRating = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:3333/v1/admin/getAllRatings');
        const data = await response.json();
        setRatings(data.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/v1/admin/deleteRatingById/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setRatings(ratings.filter(rating => rating.id !== id));
        toast.success('Rating deleted successfully');
      } else {
        toast.error('Failed to delete rating',{
          autoClose: 3000});
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rating Details</h1>
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="text-left border border-gray-300 px-4 py-2">ID</th>
            <th className="text-left border border-gray-300 px-4 py-2">Package Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">Review</th>
            <th className="text-left border border-gray-300 px-4 py-2">First Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">Email</th>
            <th className="text-left border border-gray-300 px-4 py-2">Rating</th>
            <th className="text-left border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{rating?.postId?.packageName}</td>
              <td className="border border-gray-300 px-4 py-2">{rating?.review}</td>
              <td className="border border-gray-300 px-4 py-2">{rating?.userRef?.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{rating?.userRef?.email}</td>
              <td className="border border-gray-300 px-4 py-2">
              <Rating
                    name="half-rating-read"
                    defaultValue={rating?.rating}
                    precision={0.5}
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <button className="bg-red-600 text-white px-3 py-2 rounded-lg" onClick={() => handleDelete(rating.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRating;
