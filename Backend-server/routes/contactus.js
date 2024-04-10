const express = require('express')
const { contactusValidation } = require('../validation');
const { contactusController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/createContactus')
  /**
   * createContactus
   * */
  .post(validate(contactusValidation.createContactus), contactusController.createContactus)

router
  .route('/:contactusId')
  /**
   * getContactusById
   * */
  .get(validate(contactusValidation.getContactusById), contactusController.getContactusById)

  module.exports = router;