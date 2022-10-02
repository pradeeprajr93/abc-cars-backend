const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carDetailSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    make: {
        type: String,
        required: true,
        trim: true,
    },
    exShowRoomPrice: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageLink: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
carDetailSchema.plugin(toJSON);
carDetailSchema.plugin(paginate);

/**
 * Check if productId is taken
 * @param {productId} productId - The product's id
 * @returns {Promise<boolean>}
 */
carDetailSchema.statics.isProductIdTaken = async function (productId) {
  const productDetail = await this.findOne({ productId });
  return !!productDetail;
};

/**
 * @typedef CarDetail
 */
const CarDetail = mongoose.model('CarDetail', carDetailSchema);

module.exports = CarDetail;
