import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";

const PackageList = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  //   console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const fetchAllPackages = async () => {
      setLoading(true);
      setShowMoreBtn(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`http://localhost:3333/v1/admin/travel-posts`);
        const data = await res.json();
        console.log("Data ===",data)
        setLoading(false);
        setAllPackages(data?.data);
        if (data?.packages?.length > 8) {
          setShowMoreBtn(true);
        } else {
          setShowMoreBtn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPackages();
  }, [location.search]);



  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
      </div>
      {/* ------------------------------------------------------------------------------- */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold border-b p-3 text-slate-700 mt-5">
          Package Results:
        </h1>
        <div className="w-full p-5 flex flex-wrap gap-2">
          {!loading && allPackages.length === 0 && (
            <p className="text-xl text-slate-700">No Packages Found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            allPackages &&
            allPackages.map((packageData, i) => (
              <PackageCard key={i} packageData={packageData} />
            ))}
        </div>
        {showMoreBtn && (
          <button
            onClick={onShowMoreSClick}
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
