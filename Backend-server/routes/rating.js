const express = require('express')
const { ratingValidation } = require('../validation');
const { ratingController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/giveRating')
  /**
   * giveRating
   * */
  .post(validate(ratingValidation.giveRating), ratingController.giveRating)

router
  .route('/ratingGiven/:userId/:postId')
  /**
   * ratingGiven
   * */
  .get(validate(ratingValidation.ratingGiven), ratingController.ratingGiven)

router
    .route('/averageRating/:postId')
    /**
     * 
     * averageRating
     */
    .get(validate(ratingValidation.averageRating), ratingController.averageRating)

router
    .route('/getAllRatings/:postId')
    /**
     * 
     * getAllRating
     */
    .get(validate(ratingValidation.getAllRatings), ratingController.getAllRatings)

router
    .route('/getRatingForPackage/:postId')
    /**
     * ratingGiven
     * */
    .get(validate(ratingValidation.getRatingForPackage), ratingController.getRatingForPackage)

module.exports = router;