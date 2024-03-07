const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const login = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

const getAllUser = {};

const getAllTravelPost = {};

const create = {
  body: Joi.object().keys({
    packageName: Joi.string(),
    packageDescription: Joi.string(),
    packagePrice: Joi.number(),
    location: Joi.string(),
    packageDays: Joi.number(),
    packageNights: Joi.number(),
    packageActivity: Joi.string(),
    inclusion: Joi.string(),
    exclusion: Joi.string(),
    packageImages: Joi.array()
  }),
};


const getTravelPost = {
  params: Joi.object().keys({
    travelPostId: Joi.objectId().required(),
  })
}

const updateTravelPost = {
  params: Joi.object().keys({
    travelPostId: Joi.objectId().required(),
  })
}

const deleteTravelPostById = {
  params: Joi.object().keys({
    travelPostId: Joi.objectId().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  login, 
  getAllUser, 
  getAllTravelPost,
  create, 
  getTravelPost, 
  updateTravelPost, 
  deleteTravelPostById,
  refreshTokens,
  logout
}