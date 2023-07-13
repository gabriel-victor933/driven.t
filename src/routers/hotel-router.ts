import { Router } from "express";
import {authenticateToken} from "@/middlewares"
import { getHotels, getHotelRooms } from "@/controllers";

const hotelRouter = Router()

hotelRouter
        //.all("/*",authenticateToken) FIXME: remove comment
        .get("/",getHotels)
        .get("/:hotelId",getHotelRooms)


export {hotelRouter}