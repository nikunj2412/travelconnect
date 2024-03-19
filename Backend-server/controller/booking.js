const { bookingService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const createBooking = catchAsync(async (req, res) => {
    const { body } = req;
    const booking = await bookingService.createBooking(body);
    return res.send({ results: booking });
});


module.exports = {
    createBooking
}