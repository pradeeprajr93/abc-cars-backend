const httpStatus = require('http-status');
const { CarDetail } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Car Detail
 * @param {Object} carDetailBody
 * @returns {Promise<CarDetail>}
 */
const createCarDetail = async (carDetailBody) => {
  if (await CarDetail.isProductIdTaken(carDetailBody.productId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product ID already taken');
  }
  return CarDetail.create(carDetailBody);
};

/**
 * Query for Car Details
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarDetails = async (filter, options) => {
  const carDetails = await CarDetail.paginate(filter, options);
  return carDetails;
};

/**
 * Get carDetail by id
 * @param {ObjectId} id
 * @returns {Promise<CarDetail>}
 */
const getCarDetailsById = async (id) => {
  return CarDetail.findById(id);
};

/**
 * Get Car Detail by productId
 * @param {string} productId
 * @returns {Promise<CarDetail>}
 */
const getCarDetailByProductId = async (productId) => {
  return CarDetail.findOne({ productId });
};

/**
 * Delete CarDetail by id
 * @param {ObjectId} productId
 * @returns {Promise<CarDetail>}
 */
const deleteCarDetailByProductId = async (productId) => {
  const carDetail = await getCarDetailByProductId(productId);
  if (!carDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car Detail not found');
  }
  await carDetail.remove();
  return carDetail;
};

module.exports = {
  createCarDetail,
  queryCarDetails,
  getCarDetailsById,
  getCarDetailByProductId,
  deleteCarDetailByProductId
};
