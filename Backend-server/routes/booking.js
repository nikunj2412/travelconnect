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

module.exports = router;