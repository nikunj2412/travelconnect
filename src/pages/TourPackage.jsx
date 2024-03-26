import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TourPackage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/v1/admin/travel-posts');
        setPackages(response.data.data);
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
      await axios.delete(`http://localhost:3333/v1/admin/delete/${id}`);
      setPackages(packages.filter((data) => data.id !== id));
      toast.success('Package deleted successfully');
    } catch (error) {
      toast.error('Error deleting package:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tour Packages</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
          <th className="border px-4 py-2">Package Image</th>
            <th className="border px-4 py-2">Package Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((data) => (
            <tr key={data?.id}>
              <td className="border px-4 py-2">
                  <img
                    src={data?.packageImages[0]}
                    alt="image"
                    className="w-20 h-20 rounded"
                  />
                </td>
              <td className="border px-4 py-2">{data.packageName}</td>
              <td className="border px-4 py-2">${data.packagePrice}</td>
              <td className="border px-4 py-2">{data.location}</td>
              <td className="border px-4 py-2">
              <Link to={`/update-package/${data.id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                  Edit
                </button>
                </Link>
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

export default TourPackage;
