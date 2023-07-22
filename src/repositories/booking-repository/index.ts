import { prisma } from "@/config"
import { func } from "joi"

function getRoomById(roomId: number){
    return prisma.room.findUnique({
        where: {id: roomId},
        include: {Booking: true}
    })
}

function createBooking(userId: number, roomId: number){
    return prisma.booking.create({
        data: {
            userId,
            roomId
        }
    })
}


const bookingRepository = {
    getRoomById,
    createBooking
}

export default bookingRepository