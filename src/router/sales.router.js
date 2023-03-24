const express = require('express');
const salesController = require('../controllers/sales.controller');
const { salesValidation, salesKeyValidation } = require('../middlewares/salesValidation');

const salesRouter = express.Router();

salesRouter
  .get('/', salesController.returnAllSales)
  .get('/:id', salesController.returnSaleById)
  .post('/', salesKeyValidation, salesValidation, salesController.createNewSale);

module.exports = salesRouter;
