import { Router } from "express";
import { getAllCarts, deleteProductFromCart, createCart, updateCart, updateCartProduct } from "../controllers/cart.controller.js";


const router = Router();

router.get("/", getAllCarts);
router.post("/", createCart);
router.delete("/:cid/products/:pid",deleteProductFromCart);
router.put(":cid", updateCart);
router.put("/:cid/products/:pid", updateCartProduct);

export default router;