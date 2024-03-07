import { logger } from "../../../../utils/logger.js";
import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartsMongoDao extends MongoDao {
    constructor() {
        super(CartModel);
    };

    async addProdToCart(existCart, prodId) {
        try {
            const newProd = {
                "quantity": 1,
                "product": prodId
            };
            existCart.products.push(newProd);
            const response = await this.model.updateOne({ _id: existCart._id }, existCart);
            logger.info(`Producto añadido al carrito: ${prodId}`);
            return response;
        } catch (error) {
            logger.error(`Error al agregar el producto al carrito: ${error.message}`);
            throw new Error(error);
        };
    };

    async removeProdToCart(existCart, productToRemove) {
        try {
            if (!existCart) {
                throw new Error("Cart not found");
            }
            if (!existCart.products || existCart.products.length === 0) {
                throw new Error("Cart has no products");
            }
            if (!productToRemove._id) {
                throw new Error("Product has no ID");
            }
            const productIndex = existCart.products.findIndex(p => p.product._id.toString() === productToRemove._id.toString());
            if (productIndex === -1) {
                throw new Error("Product not found in cart");
            }
            existCart.products.splice(productIndex, 1);
            const updatedCart = await existCart.save();
            logger.info(`Producto eliminado del carrito: ${productToRemove._id}`);
            return updatedCart;
        } catch (error) {
            logger.error(`Error al eliminar producto del carrito: ${error.message}`);
            throw new Error(error);
        };
    };

    async clearCart(cart) {
        try {
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = [];
            const updatedCart = await cart.save();
            logger.info(`Carrito vaciado: ${cart._id}`);
            return updatedCart;
        } catch (error) {
            logger.error(`Error al vaciar el carrito: ${error.message}`);
            throw new Error(error);
        };
    };
};