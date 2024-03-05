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
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
  }),
}

module.exports = {login, getAllUser, create}