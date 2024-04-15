import { Rating } from '@mui/material';
import React from 'react'

const RatingCard = ({packageRatings}) => {
  console.log(typeof(packageRatings))
  return (
   <>
   {packageRatings && packageRatings.map((data,i) => {
    return (
      <div
              key={i}
              className="main relative rounded-lg border p-5 gap-2 flex flex-col"
              id="main"
            >
              <div className="flex gap-2 items-center">
                <img
                  src={data.userProfileImg}
                  alt={data.username[0]}
                  className="border w-6 h-6 border-black rounded-[50%]"
                />
                <p className="font-semibold">{data.username}</p>
              </div>
              <Rating
                value={data.rating || 0}
                readOnly
                size="small"
                precision={0.1}
              />
              {/* review */}
              <p className="break-all">
                <span
                  className="break-all"
                  id="review-text"
                >
                  {data.review}
                </span>
              </p>
             
            </div>
    )
   })}
   </>
  )
}

export default RatingCard;

