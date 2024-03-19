const { bookingModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");

async function createBooking(body) {
    const booking = await bookingModel.create(body);
    return booking;
}

module.exports = { 
    createBooking
 }

