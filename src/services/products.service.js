const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const data = await productsModel.selectAll();

  return { type: null, message: data };
};

module.exports = {
  getAllProducts,
};