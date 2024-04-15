const express = require('express')
const { stripeValidation } = require('../validation');
const { stripeController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/createCustomer')
  /**
   * createCustomer
   * */
  .post(validate(stripeValidation.createCustomer), stripeController.createCustomer)

router
  .route('/addNewCard')
  /**
   * addNewCard
   * */
  .post(validate(stripeValidation.addNewCard), stripeController.addCard)

router
  .route('/createCharges')
  /**
   * createCharges
   * */
  .post(validate(stripeValidation.createCharge), stripeController.createCharges)

router
  .route('/createSession')
  /**
   * createSession
   * */
  .post(validate(stripeValidation.createSession), stripeController.createSession)


module.exports = router;