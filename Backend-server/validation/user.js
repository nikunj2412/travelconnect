const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createUser = {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.objectId().required(),
  })
}

const deleteUserById = {
  params: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
};

module.exports = {createUser, login, updateUser, deleteUserById}