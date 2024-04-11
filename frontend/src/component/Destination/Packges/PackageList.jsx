import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";

const PackageList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [priceFilter, setPriceFilter] = useState(""); 

  useEffect(() => {
    const fetchAllPackages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3333/v1/admin/travel-posts`);
        const data = await res.json();
        setLoading(false);
        setAllPackages(data?.data || []);

        if (data?.data?.length > 8) {
          setShowMoreBtn(true);
        } else {
          setShowMoreBtn(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAllPackages();
  }, []);

  const handlePriceFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setPriceFilter(selectedFilter);
  };

  const filteredPackages = allPackages.filter((packageData) => {
    return !priceFilter || priceFilter === "lowToHigh" || priceFilter === "highToLow";
  }).slice(); 

  if (priceFilter === "lowToHigh") {
    filteredPackages.sort((a, b) => a.packagePrice - b.packagePrice);
  } else if (priceFilter === "highToLow") {
    filteredPackages.sort((a, b) => b.packagePrice - a.packagePrice);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <h1 className="text-xl text-center font-semibold border-b p-3 text-slate-700 mt-5">
          List Of Packages
        </h1>
        <div className="flex justify-end p-3 mt-8 mr-44">
          <select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="">Price Filter</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
        <div className="w-full justify-center p-5 flex flex-wrap gap-2">
          {loading && <p className="text-xl text-slate-700 text-center w-full">Loading...</p>}
          {!loading &&
            filteredPackages.length === 0 && (
              <p className="text-xl text-slate-700">No Packages Found!</p>
            )}
          {!loading &&
            filteredPackages.map((packageData, i) => (
              <PackageCard key={i} packageData={packageData} />
            ))}
        </div>
        {showMoreBtn && (
          <button
            onClick={onShowMoreClick}
            className="text-sm bg-green-700 text-white hover:underline p-2 m-3 rounded text-center w-max"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default PackageList;
