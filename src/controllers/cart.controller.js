import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
import { logger } from "../utils/logger.js";

const httpResponse = new HttpResponse();
const service = new CartService();

export default class CartController extends Controllers {
  constructor() {
    super(service);
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) {
        logger.error("No se pudo eliminar el carrito:", errorsDictionary.ERROR_DELETE_CART);
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_CART);
      } else {
        logger.info("Carrito eliminado correctamente");
        return httpResponse.Ok(res, cartDel);
      };
    } catch (error) {
      logger.error("Error al eliminar el carrito:", error);
      next(error);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToUserCart = await service.addProdToCart(idCart, idProd);
      if (!newProdToUserCart){
        logger.error("No se pudo agregar el producto al carrito:", errorsDictionary.ERROR_ADD_TO_CART);
        return httpResponse.NotFound(res, errorsDictionary.ERROR_ADD_TO_CART);
      } else {
        logger.info("Producto agregado al carrito correctamente");
        return httpResponse.Ok(res, newProdToUserCart);
      }
    } catch (error) {
      logger.error("Error al agregar el producto al carrito:", error);
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await service.removeProdToCart(idCart, idProd);
      if (!delProdToUserCart) {
        logger.error("No se pudo eliminar el producto del carrito:", errorsDictionary.ERROR_DELETE_TO_CART);
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_TO_CART);
      } else {
        logger.info("Producto eliminado del carrito correctamente");
        return httpResponse.Ok(res, delProdToUserCart);
      }
    } catch (error) {
      logger.error("Error al elimimnar el producto del carrito:", error);
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await service.updateProdQuantityToCart(idCart, idProd, quantity);
      if (!updateProdQuantity) {
        logger.error("No se pudo actualizar la cantidad del producto en el carrito");
        return httpResponse.NotFound(res, "Error al actualizar la cantidad del producto en el carrito");
      } else {
        logger.info("Cantidad del producto en el carrito actualizado correctamente");
        return httpResponse.Ok(res, updateProdQuantity);
      }
    } catch (error) {
      logger.error("Error al actualizar la cantidad del producto en el carrito:", error);
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(idCart);
      if (!clearCart) {
        logger.error("No se pudo vaciar el carrito");
        return httpResponse.NotFound(res, "Error al vaciar el carrito");
      } else {
        logger.info("Carrito vaciado correctamente");
        return httpResponse.Ok(res, clearCart);
      }
    } catch (error) {
      logger.error("Error al vaciar el carrito:", error.message);
      next(error.message);
    }
  };
}