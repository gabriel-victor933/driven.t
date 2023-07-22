import { Router } from "express";
import { authenticateToken,validateBody } from '@/middlewares';
import { bookingSchema } from "@/schemas/booking-schemas";
import { postBooking, putBooking, getBooking } from "@/controllers/booking-controler";

const bookingRouter = Router()

bookingRouter
    .all("/*",authenticateToken)
    .get("/",getBooking)
    .post("/",validateBody(bookingSchema), postBooking)
    .put("/:bookingId",validateBody(bookingSchema),putBooking)

export {bookingRouter}