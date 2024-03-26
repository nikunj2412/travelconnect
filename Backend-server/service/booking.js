const { bookingModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");

async function createBooking(body) {
    const booking = await bookingModel.create(body);
    return booking;
}

async function getBookingByUserId(userId) {
    const booking = await bookingModel.find({ userId: userId }).populate('postId', 'packageName packageImages')
    .populate('userId', 'firstName email');

    if(!booking) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found for this user');
    }

    return booking;
}

async function removeBooking(filter) {
    const booking = await bookingModel.findOneAndDelete(filter);
    return booking;
}

module.exports = { 
    createBooking,
    getBookingByUserId,
    removeBooking
 }

