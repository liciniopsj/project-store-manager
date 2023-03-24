const connection = require('./connection');

const selectAll = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return data;
};

const selectProductById = async (id) => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return data;
};

const insertNewProduct = async (product) => {
  const columns = Object.keys(product).join(', ');
  const placeholders = Object.keys(product).map((_item) => '?').join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateProductById = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

module.exports = {
  selectAll,
  selectProductById,
  insertNewProduct,
  updateProductById,
};