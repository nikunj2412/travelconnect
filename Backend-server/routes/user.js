const express = require('express')
const { userValidation } = require('../validation');
const auth = require('../middleware/auth')
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
  .route('/')
  /**
   * updateUser
   * */
  .put(auth(), 
  // validate(userValidation.updateUser), 
  userController.update)
  /**
   * deleteUser
   */
  .delete(validate(userValidation.deleteUserById), userController.remove);

module.exports = router;