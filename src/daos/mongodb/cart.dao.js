import { CartModel } from './models/cart.model.js';
import { TicketModel } from './models/ticket.model.js';

export class CartDAO {
  async getAllCarts() {
    return await CartModel.find();
  }

  async createCart(cartData) {
    return await CartModel.create(cartData);
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const index = cart.products.findIndex(product => product.toString() === productId);
    if (index !== -1) {
      cart.products.splice(index, 1);
      await cart.save();
      return true;
    }

    return false;
  }

  async addProductToCart(cartId, productId) {
    let cart = await CartModel.findById(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.products.push(productId);
    await cart.save();

    return await CartModel.findById(cartId).populate('products');
  }

  async saveProductToCart(cartId, arrProducts) {
    let cart = await CartModel.findById(cartId);
    if (arrProducts.products) {
      arrProducts.products.forEach(idProduct => {
        cart.products.push(idProduct);
      });
    }
    await cart.save();
    cart = await CartModel.findById(cartId).populate('products');
    return cart;
  }

  async updCartProductsAmount(cartId, productId, body) {
    let cart = await CartModel.findById(cartId);
    for (let i = 0; i < body.quantity; i++) {
      await cart.products.push(productId);
      await cart.save();
    }
    return cart;
  }

  async createTicketForCart(cartId, amount, purchaser) {
    const ticketData = {
      amount,
      purchaser,
    };
    return await TicketModel.create(ticketData);
  }
}