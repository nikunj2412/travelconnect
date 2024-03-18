const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createlocalTourism = {
    body: Joi.object().keys({
        placeName : Joi.string(),
        placeDescription: Joi.string(),
        location: Joi.string(),
        placeActivity: Joi.string(),
        inclusion: Joi.string(),
        exclusion: Joi.string(),
        placeImages: Joi.array()
    }),
};

const getAllNotApprovedTourismPost = {};

const getAllApprovedTourismPost = {};

const getLocalTourismPostById = {
    params: Joi.object().keys({
        localTourismId: Joi.objectId().required(),
    }),
};

const updateLocalTourismPost = {
    params: Joi.object().keys({
        localTourismId: Joi.objectId().required(),
    })
}

const deleteLocalTourismPost = {
    params: Joi.object().keys({
        localTourismId: Joi.objectId().required(),
    }),
  };

module.exports = {
    createlocalTourism,
    getAllNotApprovedTourismPost,
    getAllApprovedTourismPost,
    getLocalTourismPostById,
    updateLocalTourismPost,
    deleteLocalTourismPost
}