const express = require('express')
const { localTourismValidation } = require('../validation');
const { localTourismController } = require('../controller');
const validate = require('../middleware/validate');

const router = express.Router();

router
  .route('/create')
  /**
   * createlocalTourismPost
   * */
  .post(validate(localTourismValidation.createlocalTourism), localTourismController.create)

router
  .route('/getAllNotApprovedTourismPost')
  /**
   * getAllNotApprovedTourismPost
   * */
  .get(validate(localTourismValidation.getAllNotApprovedTourismPost), localTourismController.getAllNotApprovedTourismPost)

router
  .route('/getAllApprovedTourismPost')
  /**
   * getAllApprovedTourismPost
   * */
  .get(validate(localTourismValidation.getAllApprovedTourismPost), localTourismController.getAllApprovedTourismPost)


router
  .route('/getAllTourismPost')
  /**
   * getAllTourismPost
   * */
  .get(validate(localTourismValidation.getAllTourismPost), localTourismController.getAllTourismPost)

router
  .route('/getLocalTourismPost/:localTourismId')
  /**
   * getLocalTourismPost
   * */
  .get(validate(localTourismValidation.getLocalTourismPostById), localTourismController.getLocalTourismPostById)


router
  .route('/update/:localTourismId')
  /**
   * updateLocalTourismPost
   * */
  .put(validate(localTourismValidation.updateLocalTourismPost), localTourismController.updateLocalTourismPost)

router
  .route('/delete/:localTourismId')
  /**
   * deleteLocalTourismPost
   * */
  .delete(validate(localTourismValidation.deleteLocalTourismPost), localTourismController.removeLocalTourismPost)
module.exports = router;