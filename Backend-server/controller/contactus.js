const { contactusService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const createContactus = catchAsync(async (req, res) => {
    const { body } = req;
    const contactus = await contactusService.createContactus(body);
    return res.send({ results: contactus });
});

const getContactusById = async (req, res) => {
    const { contactusId } = req.params;
    const filter = {
      _id: contactusId,
    };
    const contactus = await contactusService.getContactusById(filter);
    return res.send({ results: contactus });
};

const getAllContactus = async (req, res) => {
    const contactus = await contactusService.getAllContactus();
    return res.send({ results: contactus });
}

module.exports = {
    createContactus,
    getContactusById,
    getAllContactus
}