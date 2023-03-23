const express = require('express');
const productController = require('../controllers/products.controller');
const { nameValidation } = require('../middlewares/productNameValidation');

const productRouter = express.Router();

productRouter
  .get('/', productController.returnAllProducts)
  .get('/:id', productController.returnProductById)
  .post('/', nameValidation, productController.createNewProduct);

module.exports = productRouter;
