const mongoose = require('mongoose');
const toJSON = require('./plugins/toJSON.plugin')

const bookingSchema = new mongoose.Schema(
  {
    person: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    date: {
        type: Date,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'travelpost',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

bookingSchema.plugin(toJSON);


const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;
