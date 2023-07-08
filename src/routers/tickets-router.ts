import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes, getTickets } from "@/controllers/tickets-controller";
import { ticketTypeSchema } from "@/schemas/tickets-schemas";

const ticketRouter = Router()

ticketRouter
    //.all("/*",authenticateToken) FIXME: remover comentario
    .get("/types",getTicketsTypes)
    .get("/",getTickets)
    .post("/",validateBody(ticketTypeSchema),(req,res)=>res.send("tickets post"))


export { ticketRouter }