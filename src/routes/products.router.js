import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js"

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct)
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;