const express = require('express');
const productController = require('../controllers/products.controller');

const productRouter = express.Router();

productRouter
  .get("/", productController.returnAllProducts);
//.get('/:id', 'selectById controller');

module.exports = productRouter;
