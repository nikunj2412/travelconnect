const express = require('express')
const { bookingValidation } = require('../validation');
const { bookingController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/createBooking')
  /**
   * createBooking
   * */
  .post(validate(bookingValidation.createBooking), bookingController.createBooking)

router
  .route('/getBookinByUserId/:userId')
  /**
   * ratingGiven
   * */
  .get(validate(bookingValidation.getBookinByUserId), bookingController.getBookingByUserId)

router
  .route('/deleteBookingById/:bookingId')
  /**
   * deleteBookingById
   * */
  .delete(validate(bookingValidation.deleteBookingById), bookingController.remove)

module.exports = router;