const salesModel = require('../models/sales.model');

const addSale = async (sales) => {
  const saleId = await salesModel.insertSale();
  const addedSales = await Promise
    .all(sales
      .map(({ productId, quantity }) => salesModel
        .insertSaleProducts({ saleId, productId, quantity })));

  return { id: saleId, itemsSold: addedSales };
};

module.exports = {
  addSale,
};
