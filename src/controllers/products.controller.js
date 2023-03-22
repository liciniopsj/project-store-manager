const productsService = require('../services/products.service');

const returnAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  // use type to return error type.

  return res.status(200).json(message);
};

module.exports = {
  returnAllProducts,
};