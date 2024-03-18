import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TourismPlaces = () => {
  const [places, setplaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/v1/localTourism/getAllNotApprovedTourismPost');
        setplaces(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit package:', id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/v1/localTourism/delete/${id}`);
      setplaces(places.filter((data) => data.id !== id));
      console.log('Place deleted successfully');
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Local Tourism places</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
          <th className="border px-4 py-2">Place Image</th>
            <th className="border px-4 py-2">Place Name</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map((data) => (
            <tr key={data?._id}>
              <td className="border px-4 py-2">
                  <img
                    src={data?.placeImages[0]}
                    alt="image"
                    className="w-20 h-20 rounded"
                  />
                </td>
              <td className="border px-4 py-2">{data.placeName}</td>
              <td className="border px-4 py-2">{data.location}</td>
              <td className="border px-4 py-2">
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={() => handleEdit(data.id)}>
                  Edit
                </button> */}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourismPlaces;
