import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';

const ticketRouter = Router()

ticketRouter
    //.all("/*",authenticateToken) //remover o comentário depois de fazer tudo
    .get("/types",(req,res)=>res.send("types"))
    .get("/",(req,res)=>res.send("tickets get"))
    .post("/",(req,res)=>res.send("tickets post"))


export { ticketRouter }