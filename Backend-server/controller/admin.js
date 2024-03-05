const { adminService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const getAllUser = async (req, res) => {
    const user = await adminService.getAllUser();
    return res.send({ results: user });
};

const login = catchAsync(async(req, res) => {
  const body = req.body;
  const user = await adminService.adminLogin(body);
  return res.send({ results: user })
});

const create = catchAsync(async (req, res) => {
  const { body } = req;
  const travelPost = await adminService.createTravelPost(body);
  return res.send({ results: travelPost });
});

module.exports = {getAllUser, login, create}