import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import bookingService from '@/services/booking-service';

export function postBooking(req: AuthenticatedRequest,res: Response){

    try {
        const bookingId = bookingService.postBooking(req.userId)

        return res.status(httpStatus.OK).send({bookingId})
    } catch(err){
        return res.send(httpStatus.INTERNAL_SERVER_ERROR)
    }
}


