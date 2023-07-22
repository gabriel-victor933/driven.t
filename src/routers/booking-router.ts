import { Router } from "express";
import { authenticateToken,validateBody } from '@/middlewares';
import { bookingSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router()

bookingRouter
    //.all("/*",authenticateToken)
    .get("/",(req,res)=>{res.send("get")})
    .post("/",validateBody(bookingSchema),(req,res)=>res.send("ok"))
    .put("/:bookingId",validateBody(bookingSchema),(req,res)=>{res.send("put")})

export {bookingRouter}