const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createContactus = {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      message: Joi.string(),
    }),
};

const getContactusById = {
  params: Joi.object().keys({
    contactusId: Joi.objectId().required(),
  })
}



module.exports = {
  createContactus,
  getContactusById
}