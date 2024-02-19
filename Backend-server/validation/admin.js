const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const login = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

const getAllUser = {};

module.exports = {login, getAllUser}