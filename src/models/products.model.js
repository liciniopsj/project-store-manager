const connection = require('./connection');

const selectAll = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return data;
 };