import TicketService from "../services/ticket.services.js";
import CartService from "../services/cart.services.js";

class TicketController {
  constructor() {
    this.ticketService = new TicketService();
    this.cartService = new CartService();
  }

  async generateTicket(req, res, next) {
    try {
      const cart = await this.cartService.getCartById(req.params.cid);
      const purchaser = req.body.purchaser;
      const amount = req.body.amount;

      const generatedTicket = await this.ticketService.generateTicket(cart, purchaser, amount);

      const jsonString = JSON.stringify(generatedTicket, (key, value) => {
        if (key === 'someCircularProperty') {
          return 'Circular reference found';
        }
        return value
      });

      return res.json(JSON.parse(jsonString));
    } catch (error) {
      next(error);
    }
  }
  
  async getTicketById(req, res, next) {
    try {
      const { ticketId } = req.params;
      const ticket = await this.ticketService.getTicketById(ticketId);

      if (ticket) {
        res.json(ticket);
      } else {
        res.status(404).json({ msg: "Ticket no encontrado." });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default TicketController;