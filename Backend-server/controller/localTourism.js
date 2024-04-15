const { localTourismService } = require('../service')
const {catchAsync} = require("../utils/catchAsync")

const create = catchAsync(async (req, res) => {
    const { body } = req;
    const localTourism = await localTourismService.createLocalTourismPost(body);
    return res.send({ results: localTourism });
});

const getAllNotApprovedTourismPost = async (req, res) => {
    const localTourismPlace = await localTourismService.getNotApprovedLocalTourismPost();
    return res.send({ results: localTourismPlace });
};

const getAllApprovedTourismPost = async (req, res) => {
    const localTourismPlace = await localTourismService.getApprovedLocalTourismPost();
    return res.send({ results: localTourismPlace });
};

const getAllTourismPost = async (req, res) => {
  const localTourismPlace = await localTourismService.getLocalTourismPost();
  return res.send({ results: localTourismPlace });
};

const getLocalTourismPostById = async (req, res) => {
    const { localTourismId } = req.params;
    const filter = {
      _id: localTourismId,
    };
    const localTourismPlace = await localTourismService.getLocalTourismPostById(filter);
    return res.send({ results: localTourismPlace });
};

const updateLocalTourismPost = catchAsync(async (req, res) => {
    const { body } = req;
    const { localTourismId } = req.params;
    const filter = {
      _id: localTourismId,
    };
    const updatedLocalTourismPlace = await localTourismService.updateLocalTourismPost(filter, body);
    return res.send({ results: updatedLocalTourismPlace });
});

const removeLocalTourismPost = catchAsync(async (req, res) => {
    const { localTourismId } = req.params;
    const filter = {
      _id: localTourismId,
    };
    const removedLocalTourismPlace = await localTourismService.removeLocalTourismPost(filter);
    return res.send({ results: removedLocalTourismPlace });
  });

module.exports = {
    create,
    getAllNotApprovedTourismPost,
    getAllApprovedTourismPost,
    getLocalTourismPostById,
    updateLocalTourismPost,
    removeLocalTourismPost,
    getAllTourismPost
}