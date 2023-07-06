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