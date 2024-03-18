const { localTourismModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

async function createLocalTourismPost(body) {
    const localTourismPost = await localTourismModel.create(body);
    return localTourismPost;
}

async function getNotApprovedLocalTourismPost() {
  const alllocalTourismPlace = localTourismModel.find({ approved: false })
  return alllocalTourismPlace;
}

async function getApprovedLocalTourismPost() {
  const alllocalTourismPlace = localTourismModel.find({ approved: true })
  return alllocalTourismPlace;
}

async function getLocalTourismPostById(id) {
  const localTourismPost = await localTourismModel.findById(id);
  return localTourismPost;
}

async function getOne(query) {
  const localTourismPost = await localTourismModel.findOne(query);
  return localTourismPost;
}

async function updateLocalTourismPost(filter, body) {
  const localTourismPostData = await getOne(filter);
  if (!localTourismPostData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const localTourismPost = await localTourismModel.findOneAndUpdate(filter, body, { new: true });
  return localTourismPost;
}

async function removeLocalTourismPost(filter) {
  const localTourismPost = await localTourismModel.findOneAndDelete(filter);
  return localTourismPost;
}

module.exports = {
    createLocalTourismPost,
    getNotApprovedLocalTourismPost,
    getApprovedLocalTourismPost,
    getLocalTourismPostById,
    updateLocalTourismPost,
    removeLocalTourismPost
}