const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'travelpost',
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userProfileImg: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
  },
  { timestamps: true }
);

const rating = mongoose.model('rating', ratingSchema);

module.exports = rating;
