import { CartDAO } from '../daos/mongodb/cart.dao.js';
import ProductService from "./product.services.js";
import TicketService from './ticket.services.js';
import { CartModel } from '../daos/mongodb/models/cart.model.js';

export default class CartService {
  constructor(ticketService) {
    this.cartDAO = new CartDAO();
    this.productService = new ProductService();
    this.ticketService = ticketService;
  }
  
  async getAllCarts() {
    return await this.cartDAO.getAllCarts();
  }

  async createCart(cartData) {
    try {
      const newCart = new CartModel(cartData);
      await newCart.save();
      return newCart;
    } catch (error){
      console.error(error);
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    return await this.cartDAO.deleteProductFromCart(cartId, productId);
  }

  async saveProductToCart(cartId, arrProducts) {
    try{
        let cart = await this.cartDAO.findById(cartId);
        if (arrProducts.products) {
            arrProducts.products.forEach(idProduct => {
                cart.products.push(idProduct);
            });
        }
        await cart.save();
        cart = await this.cartDAO.findById(cartId).populate('products');
        return cart;
    } catch (error){
        console.error(error);
        return null;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      return await this.cartDAO.addProductToCart(cartId, productId);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updCartProductsAmount(cartId, productId, body) {
    return await this.cartDAO.updCartProductsAmount(cartId, productId, body);
  }

  async purchaseCart(cartId) {
    try {
      const cart = await this.cartDAO.findById(cartId);

      const productsNotPurchased = [];

      for (const product of cart.products) {
        const { productId, quantity } = product;

        const existingProduct = await this.productService.getProductById(productId);

        if (existingProduct.stock >= quantity) {
          existingProduct.stock -= quantity;
          await existingProduct.save();
        }else {
          productsNotPurchased.push(productId);
        }
      }

      const ticket = await this.ticketService.generateTicket(cartId);

      cart.products = cart.products.filter(product => !productsNotPurchased.includes(product.productId));
      await cart.save();

      return { ticket, productsNotPurchased };
    } catch (error) {
      console.error('Error purchasing cart:', error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      return await CartModel.findById(cartId).populate('products');
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}