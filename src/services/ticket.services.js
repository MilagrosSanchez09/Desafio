import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { v4 as uuidv4 } from 'uuid';

const { ticketDao, userDao, productDao, cartDao } = persistence;

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  };

  async generateTicket(userId, cartId) {
    try {
      const user = await userDao.getById(userId);

      if (!user) {
        return false;
      }

      const cart = await cartDao.getById(cartId);

      if (!cart) {
        return false;
      }

      let amountAcc = 0;
      const productsBought = [];

      for (const item of cart.products) {
        const productId = item.product._id.toString();
        const product = await productDao.getById(productId);

        if (!product) {
          continue
        }

        const amount = item.quantity * product.product_price;
        amountAcc += amount;

        productsBought.push({
          product: product.product_name,
          quantity: item.quantity,
          price: product.product_price
        });
      }

      const ticket = await ticketDao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
        products: productsBought
      });

      cart.products = [];
      cart.save();
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };
};