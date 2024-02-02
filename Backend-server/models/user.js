const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    dateOfBirth: {
      type: String
    },
    password: {
      type: String,
      private: true,
    },
});
  
userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
      User.password = await bcrypt.hash(User.password, 8);
    }
    next();
});
const userModel = mongoose.model('user',userSchema)
  
module.exports = userModel;