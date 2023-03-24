const salesModel = require('../models/sales.model');

const addSale = async (sales) => {
  const saleId = await salesModel.insertSale();
  const addedSales = await Promise
    .all(sales
      .map(({ productId, quantity }) => salesModel
        .insertSaleProducts({ saleId, productId, quantity })));

  return { id: saleId, itemsSold: addedSales };
};

const getAllSales = async () => {
  const data = await salesModel.selectAllSales();
  // console.log(data, 'Service layer');
  return { type: null, message: data };
};

const getSaleById = async (id) => {
  const data = salesModel.selectSaleById(id);
  return data;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};
