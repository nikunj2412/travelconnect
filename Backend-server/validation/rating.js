const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const giveRating = {
    body: Joi.object().keys({
            rating: Joi.number(),
            review: Joi.string(),
            postId: Joi.objectId().required(),
            userRef: Joi.objectId().required(),
            username: Joi.string(),
            userProfileImg: Joi.string(),
    }),
};

const ratingGiven = {
    params: Joi.object().keys({
        userId: Joi.objectId().required(),
        postId: Joi.objectId().required()
      })
};

const averageRating = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  })
}

const getAllRatings = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
};

const getRatingForPackage = {
  params: Joi.object().keys({
      postId: Joi.objectId().required()
    })
};

module.exports = {
    giveRating,
    ratingGiven,
    averageRating,
    getAllRatings,
    getRatingForPackage
}