import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();
const service = new TicketService();

export default class TicketController extends Controllers {
    constructor(){
        super(service);
    };

    generateTicket = async (req, res, next) => {
        try {
          const { _id } = req.user;
          const { cartId } = req.params;
          const ticket = await service.generateTicket(_id, cartId);
          if(!ticket) {
            return (
              httpResponse.NotFound(res, 'Error generate ticket')
            )
          } else {
            return (
              httpResponse.Ok(res, ticket)
            )
          };
        } catch (error) {
          next(error);
        };
      };
};