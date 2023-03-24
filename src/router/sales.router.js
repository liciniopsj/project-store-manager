const express = require('express');
const salesController = require('../controllers/sales.controller');
const { salesValidation } = require('../middlewares/salesValidation');

const salesRouter = express.Router();

salesRouter.post('/', salesValidation, salesController.createNewSale);

module.exports = salesRouter;
