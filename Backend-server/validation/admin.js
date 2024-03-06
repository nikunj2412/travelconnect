const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const login = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

const getAllUser = {};

const create = {
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    duration: Joi.string(),
    location: Joi.string(),
    includedServices: Joi.string(),
    excludedServices: Joi.string(),
    aminities: Joi.string()
  }),
}

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
  create, 
  getTravelPost, 
  updateTravelPost, 
  deleteTravelPostById,
  refreshTokens,
  logout
}