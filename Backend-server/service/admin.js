const { userModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");


async function getAllUser() {
    const user = await userModel.find();
    return user;
}

async function adminLogin(body) {
    const { email, password, isAdmin } = body;

    if (!email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        if(isAdmin){
            return user;
        }
        else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'User is not Admin');
        }
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Password');
    }
}

module.exports = {
    getAllUser,
    adminLogin
}