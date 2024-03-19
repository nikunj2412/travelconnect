const { adminService, tokenService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const getAllUser = async (req, res) => {
    const user = await adminService.getAllUser();
    return res.send({ results: user });
};

const login = catchAsync(async(req, res) => {
  const body = req.body;
  const user = await adminService.adminLogin(body);
  const token = await tokenService.generateAuthTokens(user);
  return res.send({ results: {user, token} })
});

const getAllTravelPost = async (req, res) => {
    const travelPosts = await adminService.getAllTravelPost();
    return res.send({ results: travelPosts });
};

const create = catchAsync(async (req, res) => {
  const { body } = req;
  const travelPost = await adminService.createTravelPost(body);
  return res.send({ results: travelPost });
});

const get = async (req, res) => {
  const { travelPostId } = req.params;
  const filter = {
    _id: travelPostId,
  };
  const travelPost = await adminService.getTravelPostById(filter);
  return res.send({ results: travelPost });
};

const update = catchAsync(async (req, res) => {
  const { body } = req;
  const { travelPostId } = req.params;
  const filter = {
    _id: travelPostId,
  };
  const travelPost = await adminService.updateTravelPost(filter, body);
  return res.send({ results: travelPost });
});

const remove = catchAsync(async (req, res) => {
  const { travelPostId } = req.params;
  const filter = {
    _id: travelPostId,
  };
  const travelPost = await adminService.removeTravelPost(filter);
  return res.send({ results: travelPost });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await adminService.refreshAuth(req.body.refreshToken);
  res.send({ results: { ...tokens } });
});

const logout = catchAsync(async (req, res) => {
  await tokenService.invalidateToken(req.body);
  res.send({ results: { success: true } });
});

const getAllBooking = async (req, res) => {
  const booking = await adminService.getAllBooking();
  return res.send({ results: booking });
};

module.exports = {getAllUser,getAllTravelPost, login, create, get, update, remove, refreshTokens, logout, getAllBooking}