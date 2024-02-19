const express = require('express')
const { adminValidation } = require('../validation');
const { adminController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/login')
  /**
   * login
   */
  .get(validate(adminValidation.login), adminController.login)

router
  .route('/')
  /**
   * updateAdmin
   * */
  .get(validate(adminValidation.getAllUser), adminController.getAllUser)

module.exports = router;