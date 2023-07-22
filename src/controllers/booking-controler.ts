import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import bookingService from '@/services/booking-service';
import { bookingError } from '@/protocols';

export async function postBooking(req: AuthenticatedRequest,res: Response){

    try {
        const bookingId = await bookingService.postBooking(req.userId,parseInt(req.body.roomId))
        return res.status(httpStatus.OK).send({bookingId})
    } catch(err){
        if(err.type === 'application') return res.status(err.status).send(err.message)
        return res.send(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function putBooking(req: AuthenticatedRequest,res: Response){

    const bookingId = parseInt(req.params.bookingId)
    if(isNaN(bookingId)) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        const id = await bookingService.putBooking(req.userId,parseInt(req.body.roomId),bookingId)
        return res.status(httpStatus.OK).send({bookingId: id})
    } catch(err){
        if(err.type === 'application') return res.status(err.status).send(err.message)
        return res.send(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function getBooking(req: AuthenticatedRequest,res: Response){

    try {
        const booking = await bookingService.getBookingByUserId(req.userId)

        return res.status(httpStatus.OK).send(booking)
    } catch(err){
        if(err.type === 'application') return res.status(err.status).send(err.message)
        return res.send(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

