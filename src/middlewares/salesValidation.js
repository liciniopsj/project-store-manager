const salesModel = require('../models/sales.model');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const NO_PRODUCT_ID = { message: '"productId" is required' };
const NO_QUANTITY = { message: '"quantity" is required' };
const QUANTITY_LESS_THAN_ZERO = {
  message: '"quantity" must be greater than or equal to 1',
};
const PRODUCT_NOT_FOUND = { message: "Product not found" };


const salesValidation = async (req, res, next) => {
  const salesArray = req.body;
  const data = await salesModel.selectAllSales();
  
  const ids = data.map((e) => e.product_id);

  const comparingArray = salesArray.map((e) => e.productId);

  const hasValidProductId = comparingArray.every((value) =>
    ids.includes(value)
  );

  // console.log('sales array:', salesArray);
  // console.log("DB IDS:", ids);
  // console.log("sales array product ids:", comparingArray);
  // console.log("validation:", hasValidProductId);

  const hasProductIdKey = salesArray.some((e) =>
    Object.keys(e).includes("productId")
  );

  const hasQuantityKey = salesArray.some((e) =>
    Object.keys(e).includes("quantity")
  );

  if (!hasProductIdKey) {
    return res.status(BAD_REQUEST).json(NO_PRODUCT_ID);
  }


  if (!hasQuantityKey) {
    return res.status(BAD_REQUEST).json(NO_QUANTITY);
  }

  const hasInvalidQuantity = salesArray.some((e) => e.quantity < 1);

  if (hasInvalidQuantity) {
    return res.status(UNPROCESSABLE_ENTITY).json(QUANTITY_LESS_THAN_ZERO);
  }

  if (!hasValidProductId) {
    return res.status(404).json(PRODUCT_NOT_FOUND);
  }
  
  return next();
}

module.exports = {
  salesValidation,
};