import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";

const PackageRating = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/v1/admin/travel-posts"
        );
        setPackages(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tour Packages</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Package Image</th>
            <th className="border px-4 py-2">Package Name</th>
            <th className="border px-4 py-2">Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((data) => (
            <tr key={data?._id}>
              <td className="border px-4 py-2">
                <img
                  src={data?.packageImages[0]}
                  alt="image"
                  className="w-20 h-20 rounded"
                />
              </td>
              <td className="border px-4 py-2">{data.packageName}</td>
              <td className="border px-4 py-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageRating;
