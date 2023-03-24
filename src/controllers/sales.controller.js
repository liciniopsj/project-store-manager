const salesService = require('../services/sales.service');

const createNewSale = async (req, res) => {
  const sales = await salesService.addSale(req.body);

  return res.status(201).json(sales);
};

module.exports = {
  createNewSale,
};