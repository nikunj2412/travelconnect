import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  const { packageName } = packageData;
  const truncatedName = packageName.length > 26 ? `${packageName.substring(0, 26)}...` : packageName;
  return (
    <Link to={`/package/${packageData.id}`} className="w-max">
      <div className="bg-white border flex flex-col items-center p-3 rounded shadow-md overflow-hidden">
        <img
          className="w-[300px] h-[190px] rounded border hover:scale-110  transition-all duration-300"
          src={packageData.packageImages[0]}
          alt="Package Image"
        />
        <div className="w-full flex flex-col my-2">
          <p className="font-semibold text-lg capitalize w-[90%] xsm:w-[250px]">
          {truncatedName}
          </p>
          <div className="flex items-center justify-between">
          {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
            <p className="flex text-lg items-center gap-2">
              <FaClock />
              {+packageData.packageDays > 0 &&
                (+packageData.packageDays > 1
                  ? packageData.packageDays + " Days"
                  : packageData.packageDays + " Day")}
              {+packageData.packageDays > 0 &&
                +packageData.packageNights > 0 &&
                " - "}
              {+packageData.packageNights > 0 &&
                (+packageData.packageNights > 1
                  ? packageData.packageNights + " Nights"
                  : packageData.packageNights + " Night")}
            </p>
          )}
          <span>&#36;{packageData.packagePrice}</span>
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
