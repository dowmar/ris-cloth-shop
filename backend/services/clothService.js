import {
  getAllCloths,
  getClothById,
  getClothsByCategory,
  updateClothById,
  deleteClothById,
} from "../models/cloth.js";

export const fetchAllCloths = async () => {
  return await getAllCloths();
};

export const fetchClothById = async (id) => {
  return await getClothById(id);
};
export const deleteCloth = async (id) => {
  return await deleteClothById(id);
};

export const fetchClothsByCategory = async (categoryId) => {
  return await getClothsByCategory(categoryId);
};

export const patchClothById = async (id, name, price, img) => {
  return await updateClothById(id, name, price, img);
};
