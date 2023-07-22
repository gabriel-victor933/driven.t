import { Router } from "express";
import { authenticateToken,validateBody } from '@/middlewares';
import { bookingSchema } from "@/schemas/booking-schemas";
import { postBooking } from "@/controllers/booking-controler";

const bookingRouter = Router()

bookingRouter
    .all("/*",authenticateToken)
    .get("/",(req,res)=>{res.send("get")})
    .post("/",validateBody(bookingSchema), postBooking)
    .put("/:bookingId",validateBody(bookingSchema),(req,res)=>{res.send("put")})

export {bookingRouter}