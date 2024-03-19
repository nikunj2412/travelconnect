const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createBooking = {
    body: Joi.object().keys({
      person: Joi.number(),
      totalPrice: Joi.number(),
      postId: Joi.objectId().required(),
      userId: Joi.objectId().required(),
      date: Joi.date()
    }),
};

module.exports = {
    createBooking
}