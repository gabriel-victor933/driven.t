import { Router } from "express";
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { postPayment, getPayment } from "@/controllers";
import { paymentSchema,ticketIdSchema } from "@/schemas";

const paymentRoute = Router()

paymentRoute
    .all("/*",authenticateToken) 
    .get("/",validateQuery(ticketIdSchema),getPayment)
    .post("/process",validateBody(paymentSchema),postPayment)

export  {paymentRoute}