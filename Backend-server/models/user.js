const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const toJSON = require('./plugins/toJSON.plugin')

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
    },
    profileImg: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/react-auth-83398.appspot.com/o/user.jpg?alt=media&token=50c5fcc1-4a08-4b0f-9b3b-818243e384a2"
    }
});

userSchema.plugin(toJSON);

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