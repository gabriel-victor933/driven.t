import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentServices from '@/services/payment-service';


export async function postPayment(req: AuthenticatedRequest,res: Response){

    const { userId } = req
    console.log(userId)
    try {
        const payment = await paymentServices.postPayment(userId,req.body)

        return res.status(httpStatus.OK).send(payment)
    } catch(error){
        console.error(error)
        if(error.type == "application") return res.sendStatus(error.error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function getPayment(req: AuthenticatedRequest,res: Response){

    try {
        return res.send("get")

    } catch(error){
        if(error.type == "application") return res.sendStatus(error.error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}