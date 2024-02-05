import CartService from './cart.services.js';
import TicketRepository from "../repository/ticket.repository.js";
import { v4 as uuidv4 } from 'uuid';
import { calculateTotalAmount, generateUniqueCode } from "../utils.js";
import TicketDAO from '../daos/mongodb/ticket.dao.js';

const ticketRepository = new TicketRepository();

export default class TicketService {
    constructor(cartService) {
        this.ticketDAO = new TicketDAO();
        this.cartService = new CartService();
    }
    async createTicket(ticketData) {
        try {
            const ticket = await ticketRepository.create(ticketData);
            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTicketById(ticketId) {
        try {
            const ticket = await ticketRepository.findById(ticketId);
            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }

    async generateTicket(cartId) {
        try {
            const cart = await this.cartService.getCartById(cartId);
            
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }

            const ticketData = {
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: calculateTotalAmount(cart.products),
                purchaser: cart.user,
            };

            const generatedTicket = await this.createTicket(ticketData);

            for (const product of cart.products) {
                const existingProduct = await this.productService.getProductById(product.productId);

                if (existingProduct && existingProduct.stock >= product.quantity) {
                    existingProduct.stock -= product.quantity;
                    await existingProduct.save();
                }else{
                    throw new Error(`Producto ${product.productId} no encontrado o stock insuficiente`)
                }
            }
            
            return generatedTicket;
        } catch (error) {
            console.error("Error generating ticket:", error)
            throw error;
        }
    }
}