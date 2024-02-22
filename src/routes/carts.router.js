import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
const router = Router();
const controller = new CartController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:idCart/products/:idProd", controller.addProdToCart);
router.delete("/:idCart/products/:idProd", controller.removeProdToCart);
router.delete("/clear/:idCart", controller.clearCart);

export default router;