const { adminService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const getAllUser = async (req, res) => {
    const user = await adminService.getAllUser();
    return res.send({ results: user });
};

const login = catchAsync(async(req, res) => {
  const body = req.body;
  const user = await userService.login(body);
  return res.send({ results: user })
});

module.exports = {getAllUser, login}