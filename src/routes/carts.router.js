import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { isAdmin } from "../middlewares/authorizeValidator.js";
import TicketService from "../services/ticket.services.js";

const router = Router();
const ticketService = new TicketService();
const cartController = new CartController(ticketService);

router.get("/", CartController.getAllCarts);
router.post("/", CartController.createCart);
router.delete("/:cid/products/:pid", CartController.deleteProductFromCart);
router.put("/:cid", CartController.updateCart);
router.put("/:cid/products/:pid", CartController.updateCartProduct);
router.post("/:cid/products/:pid", CartController.addProductToCart);
router.post("/:cid/purchase", isAdmin, async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { ticket, productsNotPurchased } = await cartController.purchaseCart(cid);

        if (productsNotPurchased.length >0) {
            return res.json({ msg: "Some products can't be bought.", productsNotPurchased });
        }

        return res.json({ msg: "Compra completada con éxito.", ticket });
    } catch (error) {
        next(error);
    }
});

export default router;