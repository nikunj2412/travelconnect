const mongoose = require('mongoose');
const toJSON = require('./plugins/toJSON.plugin')

const contactusSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

contactusSchema.plugin(toJSON);


const contactus = mongoose.model('contactus', contactusSchema);

module.exports = contactus;
