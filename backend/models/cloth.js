import pool from "../config/db.js";

export const getAllCloths = async () => {
  const result = await pool.query("SELECT * FROM shops");
  return result.rows;
};

export const getClothById = async (id) => {
  const result = await pool.query("SELECT * FROM shops WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateClothById = async (id, name, price, img) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE shops SET name = $1, price = $2, imgsrc = $3 WHERE id = $4 RETURNING *",
      [name, parseFloat(price), img, id]
    );
    await client.query("COMMIT");
    return result.rowCount;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const deleteClothById = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("DELETE FROM shops WHERE id = $1", [id]);
    await client.query("COMMIT");
    return result.rowCount; // Number of rows affected
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const getClothsByCategory = async (categoryId) => {
  const result = await pool.query("SELECT * FROM shops WHERE itemId = $1", [
    categoryId,
  ]);
  return result.rows;
};
