const productsModel = require('../models/products.model');
// const schema = require('./validations/validationsInputValues');

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

const addProduct = async (name) => {
  const newProductID = await productsModel.insertNewProduct({ name });
  const [addedProduct] = await productsModel.selectProductById(newProductID);

  return { type: null, message: addedProduct };
};

const updateProduct = async (id, name) => {
  const isValid = await getProductById(id);
  if (isValid.type === 404) {
    return false;
  };
  const data = await productsModel.updateProductById(id, name);
  return data;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};