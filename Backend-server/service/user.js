const { userModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");

async function createUser(body) {
  if (await userModel.isEmailTaken(body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
    const user = await userModel.create(body);
    return user;
}

async function getUserById(id) {
    const user = await userModel.findById(id);
    return user;
}

async function login(body) {
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
}

async function getOne(query) {
  const user = await userModel.findOne(query);
  return user;
}

async function updateUser(filter, body) {
  const userData = await getOne(filter);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (body.email && (await userModel.isEmailTaken(body.email, userData.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await userModel.findOneAndUpdate(filter, body, { new: true });
  return user;
}

async function removeUser(filter) {
  const user = await userModel.findOneAndDelete(filter);
  return user;
}

module.exports = {
    createUser,
    getUserById,
    login,
    updateUser,
    removeUser
}