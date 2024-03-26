const { bookingService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const createBooking = catchAsync(async (req, res) => {
    const { body } = req;
    const booking = await bookingService.createBooking(body);
    return res.send({ results: booking });
});

const getBookingByUserId = async (req, res) => {
    const { userId } = req.params;
    const booking = await bookingService.getBookingByUserId(userId);
    return res.send({ results: booking });
};

const remove = catchAsync(async (req, res) => {
    const { bookingId } = req.params;
    const filter = {
      _id: bookingId,
    };
    const booking = await bookingService.removeBooking(filter);
    return res.send({ results: booking });
});


module.exports = {
    createBooking,
    getBookingByUserId,
    remove
}