import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';


export async function postPayment(req: AuthenticatedRequest,res: Response){

    try {
        return res.send("post")
    } catch(error){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function getPayment(req: AuthenticatedRequest,res: Response){

    try {
        return res.send("get")

    } catch(error){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}