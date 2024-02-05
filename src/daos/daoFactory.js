import UserDAO from './mongodb/user.dao.js';
import { ProductDAO } from './mongodb/product.dao.js';
import { CartDAO } from './mongodb/cart.dao.js';
import TicketDAO from './mongodb/ticket.dao.js';

class DAOFactory {
  getProductDAO() {
    return new ProductDAO();
  }
  getCartDAO(){
    return new CartDAO();
  }
  getUserDAO(){
    return new UserDAO();
  }
  getTicketDAO(){
    return new TicketDAO();
  }
}

export default new DAOFactory();