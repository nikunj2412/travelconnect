const { userModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");

async function createUser(body) {
    const user = await userModel.create(body);
    return user;
}

async function getUserById(id) {
    const user = await userModel.findById(id);
    return user;
}

async function login(body) {
    try {
        const { email, password } = body;

        if (!email || !password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Email');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return user;
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Password');
        }
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'An API error occurred');
    }
}

module.exports = {
    createUser,
    getUserById,
    login
}