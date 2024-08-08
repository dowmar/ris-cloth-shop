import express from "express";
import {
  getCloths,
  getCloth,
  getClothsByCategory,
  updateCloth,
  deleteClothId,
} from "../controllers/clothController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", getCloths);
router.get("/:id", getCloth);
router.get("/category/:categoryId", getClothsByCategory);
router.patch("/:id", updateCloth);
router.delete("/:id", deleteClothId);

export default router;
