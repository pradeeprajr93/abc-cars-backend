const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { carDetailService } = require('../services');

const createCarDetail = catchAsync(async (req, res) => {
  const carDetail = await carDetailService.createCarDetail(req.body);
  res.status(httpStatus.CREATED).send(carDetail);
});

const getCarDetails = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'make']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await carDetailService.queryCarDetails(filter, options);
  res.send(result);
});

const getCarDetail = catchAsync(async (req, res) => {
  const carDetail = await carDetailService.getCarDetailByProductId(req.params.productId);
  if (!carDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car Detail not found');
  }
  res.send(carDetail);
});

const deleteCarDetail = catchAsync(async (req, res) => {
  await carDetailService.deleteCarDetailByProductId(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createCarDetail,
    getCarDetails,
    getCarDetail,
    deleteCarDetail
};
