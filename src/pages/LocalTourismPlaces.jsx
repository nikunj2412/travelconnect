import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TourismPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [approvedPlaces, setApprovedPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch non-approved tourism places
        const nonApprovedResponse = await axios.get('http://localhost:3333/v1/localTourism/getAllNotApprovedTourismPost');
        setPlaces(nonApprovedResponse.data.data);

        // Fetch approved tourism places
        const approvedResponse = await axios.get('http://localhost:3333/v1/localTourism/getAllApprovedTourismPost');
        setApprovedPlaces(approvedResponse.data.data);

        console.log('Non-approved places:', nonApprovedResponse.data.data);
        console.log('Approved places:', approvedResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3333/v1/localTourism/update/${id}`, { approved: true });
      setPlaces(places.filter((data) => data.id !== id));
      console.log('Place updated successfully', places);
    } catch (error) {
      console.error('Error updating place:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/v1/localTourism/delete/${id}`);
      setPlaces(places.filter((data) => data.id !== id));
      console.log('Place deleted successfully');
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };
  const handleApprovedPlaceDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/v1/localTourism/delete/${id}`);
      setApprovedPlaces(approvedPlaces.filter((data) => data.id !== id)); // Update approvedPlaces state after deletion
      console.log('Approved place deleted successfully');
    } catch (error) {
      console.error('Error deleting approved place:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Local Tourism Places</h2>
      <h3 className="text-xl font-bold mb-2">Non-Approved Places</h3>
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
            <tr key={data?.id}>
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={() => handleEdit(data.id)}>
                  Approve
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-8 mb-2">Approved Places</h3>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Place Image</th>
            <th className="border px-4 py-2">Place Name</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {approvedPlaces.map((data) => (
            <tr key={data?.id}>
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
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleApprovedPlaceDelete(data.id)}>
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
