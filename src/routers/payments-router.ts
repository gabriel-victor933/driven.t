import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { postPayment, getPayment } from "@/controllers";
import { paymentSchema } from "@/schemas";

const paymentRoute = Router()

paymentRoute
    .all("/*",authenticateToken) 
    .get("/",getPayment)
    .post("/process",validateBody(paymentSchema),postPayment)

export  {paymentRoute}