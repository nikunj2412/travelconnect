const { travelModel, ratingModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

async function giveRating(body) {
    const postId = body.postId;
    const newRating = await ratingModel.create(body);

    if(!newRating){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Rating is not created');
    }
    
      const ratings = await ratingModel.find({
        postId: postId,
      });

      let totalRatings = ratings.length;
      let totalStars = 0;
      ratings.forEach(rating => {
        totalStars += rating.rating;
      });
      let average_rating = Math.round((totalStars / totalRatings) * 10) / 10;

      await travelModel.findByIdAndUpdate(
        postId,
        {
          $set: {
            packageRating: average_rating,
            packageTotalRatings: totalRatings,
          },
        },
        { new: true }
      );

      return newRating;
}

async function ratingGiven(userId, postId) {
    const rating_given = await ratingModel.findOne({userRef: userId, postId: postId});

    if(!rating_given){
        throw new ApiError(httpStatus.BAD_REQUEST, 'there is no rating for this post');
    }

    return rating_given;
}

async function averageRating(filter) {
    const ratings = await ratingModel.find(filter);
    if(!ratings.length){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Ratings not found');
    }
    let totalStars = 0;
    ratings.forEach(rating => {
      totalStars += rating.rating;
    });
    let average = Math.round((totalStars / ratings.length) * 10) / 10;

    if(!average){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Average can not be calculated'); 
    }

    return average;
}

async function getAllRatings(filter, limit) {

    const ratings = await ratingModel.find(filter);
    
    if(!ratings) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Ratings not found for this post');
    }

    return ratings;
}

module.exports = {
  giveRating,
  ratingGiven,
  averageRating,
  getAllRatings,
};
