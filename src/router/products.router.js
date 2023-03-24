const express = require('express');
const productController = require('../controllers/products.controller');
const { nameValidation } = require('../middlewares/productNameValidation');

const productRouter = express.Router();

productRouter
  .get('/', productController.returnAllProducts)
  .post('/', nameValidation, productController.createNewProduct)
  .get('/:id', productController.returnProductById)
  .put('/:id', nameValidation, productController.editProduct);

module.exports = productRouter;
