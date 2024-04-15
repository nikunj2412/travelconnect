const express = require('express')
const { userValidation } = require('../validation');
const auth = require('../middleware/auth')
const { userController, adminController } = require('../controller');
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

  router
    .route('/userLogin')
  .post(validate(userValidation.login), userController.login)

router
  .route('/update/:userId')
  /**
   * updateUser
   * */
  .put(
  validate(userValidation.updateUser), 
  userController.update)
  /**
   * deleteUser
   */
  .delete(validate(userValidation.deleteUserById), userController.remove);

router
  .route('/logout')
  
  .post(validate(userValidation.logout), adminController.logout);

module.exports = router;