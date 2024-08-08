import {
  insertUser,
  checkDuplicate,
  insertRefreshToken,
  findUserByToken,
  deleteRefreshTokenByToken,
  createRole,
  userRole,
} from "../models/register.js";

export const registerUser = async (user, pwd, email, login_type) => {
  return await insertUser(user, pwd, email, login_type);
};

export const checkDuplicateUser = async (email) => {
  const hasil = await checkDuplicate(email);
  // console.log("services", hasil);
  return hasil;
};

export const insertToken = async (email, token, expiry_date) => {
  return await insertRefreshToken(email, token, expiry_date);
};

export const findUserByRefresh = async (token) => {
  return await findUserByToken(token);
};

export const deleteRefreshToken = async (token) => {
  return await deleteRefreshTokenByToken(token);
};

export const createUserRole = async (email, role) => {
  return await createRole(email, role);
};

export const checkUserByRole = async (email) => {
  const hasil = await userRole(email);
  // console.log("services", hasil);
  return hasil;
};
