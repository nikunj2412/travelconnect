const userRoutes =  require('./user');
const express = require('express')
const adminRoutes =  require('./admin');
const ratingRoutes = require('./rating')
const bookingRoutes = require('./booking')
const localTourismRoutes = require('./localTourism')
const stripeRoutes = require('./stripe')

const router = express.Router();
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/rating', ratingRoutes);
router.use('/localTourism', localTourismRoutes);
router.use('/booking', bookingRoutes);
router.use('/stripe', stripeRoutes);

module.exports = router;