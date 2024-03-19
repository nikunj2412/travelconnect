const { ratingService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const giveRating = catchAsync(async (req, res) => {
    const { body } = req;
    const rating = await ratingService.giveRating(body);
    return res.send({ results: rating });
});


const ratingGiven = async (req, res) => {
    const { userId, postId } = req.params;
    const rating = await ratingService.ratingGiven(userId, postId);
    return res.send({ results: rating });
};

const averageRating = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const filter = {
    postId: postId,
  };
  const rating = await ratingService.averageRating(filter);
  return res.send({ results: rating });
});

const getAllRatings = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const filter = {
    _id: postId,
  };
  const rating = await ratingService.getAllRatings(filter);
  return res.send({ results: rating });
});

const getRatingForPackage = async (req, res) => {
  const { postId } = req.params;
  const rating = await ratingService.getRatingForPackage(postId);
  return res.send({ results: rating });
};


module.exports = {
    giveRating,
    ratingGiven,
    averageRating,
    getAllRatings,
    getRatingForPackage
}