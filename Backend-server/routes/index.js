const userRoutes =  require('./user');
const express = require('express')
const adminRoutes =  require('./admin');
const ratingRoutes = require('./rating')

const router = express.Router();
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/rating', ratingRoutes)

module.exports = router;