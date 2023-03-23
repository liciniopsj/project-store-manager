const productsService = require('../services/products.service');

const returnAllProducts = async (_req, res) => {
  const { message } = await productsService.getAllProducts();

  // use type to return error type.

  return res.status(200).json(message);
};

const returnProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getProductById(id);

  if (type) {
    return res.status(type).json(message);
  }

  return res.status(200).json(message);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;

  const { message } = await productsService.addProduct(name);

  return res.status(201).json( message );
};

module.exports = {
  returnAllProducts,
  returnProductById,
  createNewProduct,
};