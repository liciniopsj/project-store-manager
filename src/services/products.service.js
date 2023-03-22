const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const data = await productsModel.selectAll();

  return { type: null, message: data };
};

const getProductById = async (id) => {
  const [data] = await productsModel.selectProductById(id);

  if (!data) {
    return { type: 404, message: { message: 'Product not found' } };
  }

  return { type: null, message: data };
};

module.exports = {
  getAllProducts,
  getProductById,
};