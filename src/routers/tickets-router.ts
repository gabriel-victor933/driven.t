import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes, getTickets } from "@/controllers/tickets-controller";

const ticketRouter = Router()

ticketRouter
    .all("/*",authenticateToken) //remover o comentário depois de fazer tudo
    .get("/types",getTicketsTypes)
    .get("/",getTickets)
    .post("/",(req,res)=>res.send("tickets post"))


export { ticketRouter }