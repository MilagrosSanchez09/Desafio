import TicketDAO from '../daos/mongodb/ticket.dao.js';

export default class TicketRepository {
  constructor() {
    this.ticketDAO = new TicketDAO();
  }

  async create(ticketData) {
    try {
      return await this.ticketDAO.create(ticketData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(ticketId) {
    try {
      return await this.ticketDAO.findById(ticketId);
    } catch (error) {
      throw new Error(error);
    }
  }
}