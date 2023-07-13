import httpStatus from "http-status"
import { Request, Response } from 'express';
import { AuthenticatedRequest } from "@/middlewares";


export async function getHotels(req: AuthenticatedRequest,res: Response){
    try {
        return res.send("get")
    } catch(error){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function getHotelRooms(req: AuthenticatedRequest,res: Response){
    try {
        return res.send("rooms")
    } catch(error){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}