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
 
module.exports = {
  selectAll,
  selectProductById,
};