const { userService } = require('../service')

const create = async (req, res) => {
    const { body } = req;
    console.log("body==in controller=", body)
    const user = await userService.createUser(body);
    return res.send({ results: user });
};

const get = async (req, res) => {
    const { userId } = req.params;
    const filter = {
      _id: userId,
    };
    const user = await userService.getUserById(filter);
    return res.send({ results: user });
  };

module.exports = {create, get}