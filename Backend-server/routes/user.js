const express = require('express')
const { userValidation } = require('../validation');
const { userController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/')
  /**
   * createUser
   * */
  .post(validate(userValidation.createUser), userController.create)
  /**
   * login
   */
  .get(validate(userValidation.login), userController.login)

router
  .route('/:userId')
  /**
   * updateUser
   * */
  .put(validate(userValidation.updateUser), userController.update)

module.exports = router;