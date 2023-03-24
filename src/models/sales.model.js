const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );

  return insertId;
};

const insertSaleProducts = async (sale) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity)
  VALUES (?,?,?)`;
  
  const { saleId, productId, quantity } = sale;
  
  await connection.execute(query, [saleId, productId, quantity]);

  return { productId, quantity };
};

const selectSaleById = async (id) => {
  const query = `SELECT date, product_id as productId, quantity 
    FROM StoreManager.sales_products as salesP
    JOIN StoreManager.sales as sales
    ON salesP.sale_id = sales.id
    WHERE salesP.sale_id = ?
    ORDER BY sale_id, product_id`;
  const [data] = await connection.execute(query, [id]);
  return data;
};

const selectAllSales = async () => {
  const [data] = await connection.execute('SELECT * FROM StoreManager.sales_products');
  return data;
};

const selectByProductId = async (id) => {
  const [data] = await connection
    .execute('SELECT product_id FROM StoreManager.sales_products WHERE product_id = ?', [id]);
  return data;
};

module.exports = {
  insertSale,
  insertSaleProducts,
  selectSaleById,
  selectAllSales,
  selectByProductId,
};
