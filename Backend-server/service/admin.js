const { userModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");


async function getAllUser() {
    const user = await userModel.find();
    return user;
}

module.exports = {
    getAllUser
}