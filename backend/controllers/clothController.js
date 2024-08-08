import {
  fetchAllCloths,
  fetchClothById,
  fetchClothsByCategory,
  patchClothById,
  deleteCloth,
} from "../services/clothService.js";

export const getCloths = async (req, res) => {
  try {
    const cloths = await fetchAllCloths();
    res.status(200).json(cloths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCloth = async (req, res) => {
  try {
    const { id } = req.params;
    const cloth = await fetchClothById(id);
    if (!cloth) {
      res.status(404).json({ message: "Cloth not found" });
    } else {
      res.status(200).json(cloth);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClothId = async (req, res) => {
  try {
    const { id } = req.params;
    const cloth = await deleteCloth(id);
    if (!cloth) {
      res.status(404).json({ message: "Cloth not found" });
    } else {
      res.status(200).json(cloth);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCloth = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, price } = req.body;
    const cloth = await patchClothById(id, name, price, img);
    if (!cloth) {
      res.status(404).json({ message: "Cloth not found" });
    } else {
      res.status(200).json(cloth);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClothsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const cloths = await fetchClothsByCategory(categoryId);
    res.status(200).json(cloths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
