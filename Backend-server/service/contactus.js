const { contactusModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

async function createContactus(body) {
    const contactus = await contactusModel.create(body);
    return contactus;
}

async function getContactusById(id) {
    const contactus = await contactusModel.findById(id);
    return contactus;
}

async function getAllContactus () {
    const contactus = await contactusModel.find();
    return contactus;
  };

module.exports = {
    createContactus,
    getContactusById,
    getAllContactus
}