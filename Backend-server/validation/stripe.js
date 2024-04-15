const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createCustomer = {
    body: Joi.object().keys({
        name : Joi.string(),
        email: Joi.string()
    }),
};

const addNewCard = {
    body: Joi.object().keys({
        customer_id: Joi.string(),
        token: Joi.string()
    }),
};

const createCharge = {
    body: Joi.object().keys({
        amount: Joi.number(),
        card_id: Joi.string(),
        customer_id: Joi.string()
    }),
};

const createSession = {
    // body: Joi.object().keys({
    //     amount: Joi.number(),
    //     card_id: Joi.string(),
    //     customer_id: Joi.string()
    // }),
    // body: Joi.object().keys({
    //     // packages: Joi.array(),
    // })
};

module.exports = {
    createCustomer,
    addNewCard,
    createCharge,
    createSession
}