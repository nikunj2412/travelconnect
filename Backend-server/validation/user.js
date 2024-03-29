const Joi = require('@hapi/joi');

const createUser = {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    }),
};

module.exports = {createUser}