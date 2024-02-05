import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, generateMockedProducts } from "../controllers/product.controller.js"
import { isAdmin, isUser } from "../middlewares/authorizeValidator.js";

const router = Router();

router.get("/mockingproducts", generateMockedProducts);
router.get("/:productId", getProductById);
router.get("/", getAllProducts);
router.post("/", isAdmin, createProduct)
router.delete("/:productId", isAdmin,deleteProduct);
router.put("/:productId", isAdmin, updateProduct);

export default router;