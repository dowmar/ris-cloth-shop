import pool from "../config/db.js";

export const getAllUser = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const checkDuplicate = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  console.log("model", result.rows[0]);
  return result.rows;
};

export const insertUser = async (name, pwd, email, login_type) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO users (name, pwd, email, login_type) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, pwd, email, login_type]
    );
    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const insertRefreshToken = async (email, encryptedToken, expireDate) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO refresh_tokens (email, token, expiry_date) VALUES ($1, $2, $3) RETURNING *",
      [email, encryptedToken, expireDate]
    );
    await client.query("COMMIT");
    return result.rowCount;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const deleteRefreshTokenByToken = async (token) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "DELETE FROM refresh_tokens WHERE token = $1",
      [token]
    );
    await client.query("COMMIT");
    return result.rowCount; // Number of rows affected
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const findUserByToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token = $1",
    [token]
  );
  console.log("findUserByToken", result.rows[0]);
  return result.rows;
};

export const userRole = async (email) => {
  const result = await pool.query("SELECT * FROM roles WHERE email = $1", [
    email,
  ]);
  console.log("model", result.rows[0]);
  return result.rows[0];
};

export const createRole = async (email, role) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO roles (email, roles) VALUES ($1, $2) RETURNING *",
      [email, role]
    );
    await client.query("COMMIT");
    return result.rowCount;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
