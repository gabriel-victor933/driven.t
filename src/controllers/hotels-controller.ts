import httpStatus from "http-status"
import { Request, Response } from 'express';
import { AuthenticatedRequest } from "@/middlewares";
import hotelsServices from "@/services/hotels-service";


export async function getHotels(req: AuthenticatedRequest,res: Response){

    const {userId} = req

    try {
        const hotels = await hotelsServices.getHotels(userId)

        return res.send(hotels)
    } catch(error){
        if(error.type == "application") return res.status(error.statusCode).send(error.message)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function getHotelRooms(req: AuthenticatedRequest,res: Response){
    const {userId} = req
    try {

    } catch(error){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}