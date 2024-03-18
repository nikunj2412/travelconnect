const userRoutes =  require('./user');
const express = require('express')
const adminRoutes =  require('./admin');
const ratingRoutes = require('./rating')
const localTourismRoutes = require('./localTourism')

const router = express.Router();
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/rating', ratingRoutes);
router.use('/localTourism', localTourismRoutes)

module.exports = router;