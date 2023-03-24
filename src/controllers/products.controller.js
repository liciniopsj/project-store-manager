const productsService = require('../services/products.service');

const returnAllProducts = async (_req, res) => {
  const { message } = await productsService.getAllProducts();

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

  const { type, message } = await productsService.addProduct(name);

  if (type) { return res.status(422).json(message); }

  return res.status(201).json(message);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = await productsService.updateProduct(id, name);
  if (!data) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(data);
};

module.exports = {
  returnAllProducts,
  returnProductById,
  createNewProduct,
  editProduct,
};