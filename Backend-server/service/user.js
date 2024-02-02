const { userModel } = require('../models');

async function createUser(body) {
    const user = await userModel.create(body);
    console.log("body in service===", user)
    return user;
}

async function getUserById(id) {
    const user = await userModel.findById(id);
    return user;
}

module.exports = {
    createUser,
    getUserById
}