const { userModel, travelModel, tokenModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const tokenService = require('./token')
const userService = require('./user')


async function getAllUser() {
    const user = await userModel.find();
    return user;
}

async function getAllTravelPost () {
  const travelPosts = await travelModel.find();
  return travelPosts;
};

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

async function createTravelPost(body) {
      const travelPost = await travelModel.create(body);
      return travelPost;
}

async function getTravelPostById(id) {
    const travelPost = await travelModel.findById(id);
    return travelPost;
}

async function getOne(query) {
    const tavelPost = await travelModel.findOne(query);
    return tavelPost;
  }

async function updateTravelPost(filter, body) {
    const tavelPostData = await getOne(filter);
    if (!tavelPostData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
    }
    const tavelPost = await travelModel.findOneAndUpdate(filter, body, { new: true });
    return tavelPost;
  }
  
async function removeTravelPost(filter) {
    const tavelPost = await travelModel.findOneAndDelete(filter);
    return tavelPost;
}

const refreshAuth = async (refreshToken) => {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
      const user = await userService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Token');
      }
      await refreshTokenDoc.remove();
      return tokenService.generateAuthTokens(user);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

const resetPasswordToken = async (resetPasswordRequest) => {
    const { email, code, password } = resetPasswordRequest;
    const resetPasswordTokenDoc = await tokenService.verifyCode({
      email,
      type: 'resetPassword',
      code,
    });
    const { user } = resetPasswordTokenDoc;
    await tokenModel.deleteMany({ user, type: 'resetPassword' });
    const filter = {
      _id: user._id,
    };
    return userService.updateUser(filter, { password });
};

module.exports = {
    getAllUser,
    getAllTravelPost,
    adminLogin,
    createTravelPost,
    getTravelPostById,
    updateTravelPost,
    removeTravelPost,
    refreshAuth,
    resetPasswordToken
}