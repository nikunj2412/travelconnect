const express = require('express')
const { adminValidation, ratingValidation, bookingValidation } = require('../validation');
const auth = require('../middleware/auth')
const { adminController, ratingController, bookingController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/login')
  /**
   * login
   */
  .post(validate(adminValidation.login), adminController.login)

router
  .route('/')
  /**
   * getAllUsers
   * */
  .get(validate(adminValidation.getAllUser), adminController.getAllUser)

router
.route('/travel-posts')
/**
 * GetAllTravelPost
 * */
.get(validate(adminValidation.getAllTravelPost), adminController.getAllTravelPost)

router
  .route('/create')
  /**
   * CreateTravelPost
   * */
  .post(validate(adminValidation.create), adminController.create)

router
  .route('/post/:travelPostId')
  /**
   * GetTravelPostById
   * */
  .get(validate(adminValidation.getTravelPost), adminController.get)

router
  .route('/update/:travelPostId')
  /**
   * updateTravelPost
   * */
  .put(validate(adminValidation.updateTravelPost), adminController.update)

router
  .route('/delete/:travelPostId')
  /**
   * removeTravelPostById
   * */
  .delete(validate(adminValidation.deleteTravelPostById), adminController.remove)

router
  .route('/refresh-tokens')
  /**
   * refreshtoken
   * */

  .post(validate(adminValidation.refreshTokens),adminController.refreshTokens)

router
  .route('/logout')
  
  .post(auth(), validate(adminValidation.logout), adminController.logout);

router
  .route('/getAllBookings')
  /**
   * getAllBookings
   * */
  .get(validate(adminValidation.getAllBooking), adminController.getAllBooking)

router
  .route('/getAllRatings')
  /**
   * getAllBookings
   * */
  .get(validate(adminValidation.getAllRating), adminController.getAllRatings)

router
  .route('/deleteRatingById/:ratingId')
  /**
   * deleteRatingById
   * */
  .delete(validate(ratingValidation.deleteRatingById), ratingController.removeRating)

module.exports = router;