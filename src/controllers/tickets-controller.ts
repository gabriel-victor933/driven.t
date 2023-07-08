import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsServices from '@/services/tickets-service';

export async function getTicketsTypes(req: AuthenticatedRequest,res: Response){

    try {
        const types = await ticketsServices.getTicketsTypes()

        return res.status(httpStatus.OK).send(types)
    } catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("erro")
    }
}

export async function getTickets(req: AuthenticatedRequest,res: Response){

    const { userId } = req;
    try {
        const tickets = await ticketsServices.getTickets(userId)
        
        return res.status(httpStatus.OK).send(tickets)
    } catch(error){
        if(error.type == "application") return res.sendStatus(error.error)

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("erro")
    }
}

export async function postTickets(req: AuthenticatedRequest,res: Response){

    const { userId } = req;
    const { ticketTypeId } = req.body
    
    try {
        const tickets = await ticketsServices.postTickets(userId,ticketTypeId)
        return res.status(httpStatus.CREATED).send(tickets)

    } catch(error){
        if(error.type == "application") return res.sendStatus(error.error)

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("erro")
    }
}
