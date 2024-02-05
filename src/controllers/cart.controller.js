import CartServiceClass from "../services/cart.services.js";
import ProductService from "../services/product.services.js";
import { isAdmin } from "../middlewares/authorizeValidator.js";
import { User } from "../daos/mongodb/models/user.model.js";

const CartService = new CartServiceClass();

class CartController {
  static async getAllCarts(req, res, next) {
    try {
      const carts = await CartService.getAllCarts();
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductFromCart(req, res, next) {
    try {
      const { cid, pid } = req.params;
      const productDel = await CartService.deleteProductFromCart(cid, pid);
      res.json(productDel);
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    try {
      const { name } = req.body;

      const currentUser = req.user;

      if (!currentUser) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const newCart = await CartService.createCart({ name, user: currentUser._id });

      if (!newCart) {
        res.json({ msg: 'No se puede crear el carrito' });
      } else {

        currentUser.cart = newCart._id;
        await currentUser.save();

        res.json(newCart);
      }

    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req, res, next) {
    try {
      const { cid } = req.params;
      const newData = req.body;

      const cart = await CartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      const updatedCart = await CartService.saveProductToCart(cid, newData);

      if (updatedCart) {
        res.status(200).json(updatedCart);
      } else {
        res.status(404).json({ error: 'Carrito o producto no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async addProductToCart(req, res, next) {
    try {
      const { cid, pid } = req.params;
      
      const cart = await CartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json ({ error: 'Carrito no encontrado' });
      }

      const product = await ProductService.getProductById(pid);
  
      if (!product || product.stock < 1) {
        return res.status(400).json({ error: 'Producto no disponible' });
      }

      const updatedCart = await CartService.addProductToCart(cid, pid);
      return res.json(updatedCart);
    } catch (error) {
      next (error);
    }
  }
  
  static async updateCartProduct(req, res, next) {
    try {
      const { cid, pid } = req.params;
      const body = req.body;
      const updatedCart = await CartService.updateCartProduct(cid, pid, body);

      return res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;