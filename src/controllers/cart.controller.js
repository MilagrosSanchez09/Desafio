import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

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
        return (
          httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_CART)
        )
      } else {
        return (
          httpResponse.Ok(res, cartDel)
        )
      };
    } catch (error) {
      next(error);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToUserCart = await service.addProdToCart(
        idCart,
        idProd,
      );
      if (!newProdToUserCart){
        return (
          httpResponse.NotFound(res, errorsDictionary.ERROR_ADD_TO_CART)
        )
      } else {
        httpResponse.Ok(res, newProdToUserCart)
        };
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) {
        return (
          httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_TO_CART)
        )
      } else {
        return (
          httpResponse.Ok(res, delProdToUserCart)
        )
      };
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) {
        return (
          httpResponse.NotFound(res, "Error update product quantity to cart")
        )
      } else {
        return (
          httpResponse.Ok(res, updateProdQuantity)
        )
      };
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(
        idCart,
      );
      if (!clearCart) {
        return (
          httpResponse.NotFound(res, "Error clear cart")
        )
      } else {
        return (
          httpResponse.Ok(res, clearCart)
        )  
      };
    } catch (error) {
      next(error.message);
    }
  };
};