const { stripeService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const createCustomer = catchAsync(async (req, res) => {
    const { body } = req;
    const customer = await stripeService.createCustomer(body);
    return res.send({ results: customer });
});

const addCard = catchAsync(async (req, res) => {
    const { body } = req;
    const card = await stripeService.addNewCard(body);
    return res.send({ results: card.id });
});

const createCharges = catchAsync(async (req, res) => {
    const { body } = req;
    const charges = await stripeService.createCharges(body);
    return res.send({ results: charges });
});

module.exports = {
    createCustomer,
    addCard,
    createCharges
}