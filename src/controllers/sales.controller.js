const salesService = require('../services/sales.service');

const createNewSale = async (req, res) => {
  const sales = await salesService.addSale(req.body);

  return res.status(201).json(sales);
};

const returnAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();

  // console.log(message, 'controller layer');

  return res.status(200).json(message);
};

const returnSaleById = async (req, res) => {
  const { id } = req.params;

  const data = await salesService.getSaleById(id);

  // console.log(data, '!!!!!!!!!!!!!!!!!');
  if (data.length === 0) {
    return res.status(404).json({ message: 'Sale not found' })
  }

  return res.status(200).json(data);
};

module.exports = {
  createNewSale,
  returnAllSales,
  returnSaleById,
};