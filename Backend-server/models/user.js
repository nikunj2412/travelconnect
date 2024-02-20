const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    address: {
      type: String
    },
    password: {
      type: String,
      private: true,
    },
    mobileNumber: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const User = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!User;
};
  
userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
      User.password = await bcrypt.hash(User.password, 10);
    }
    next();
});
const userModel = mongoose.model('user',userSchema)
  
module.exports = userModel;