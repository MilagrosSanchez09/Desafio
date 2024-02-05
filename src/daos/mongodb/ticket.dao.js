import { TicketModel } from "./models/ticket.model.js";

export default class TicketDAO {
  async create(ticketData) {
    try {
      return await TicketModel.create(ticketData);
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

}