import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';

const controller = new TicketController();
const router = Router();

router.post('/generate/:cid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const purchaser = req.body.purchaser;
        const amount = req.body.amount;

        const generatedTicket = await controller.generateTicket(req, res, next);

        return res.json({ msg: 'Ticket generated succesfully', ticket: generatedTicket });
    } catch (error){
        next (error);
    }
});

router.get('/:ticketId', controller.getTicketById);

export default router;