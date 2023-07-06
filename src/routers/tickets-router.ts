import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes } from "@/controllers/tickets-controller";

const ticketRouter = Router()

ticketRouter
    //.all("/*",authenticateToken) //remover o comentário depois de fazer tudo
    .get("/types",getTicketsTypes)
    .get("/",(req,res)=>res.send("tickets get"))
    .post("/",(req,res)=>res.send("tickets post"))


export { ticketRouter }