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

function getBookingById(bookingId: number, userId: number){
    return prisma.booking.findFirst({
        where: {
            AND: [
                {id: bookingId},
                {userId: userId}
            ]
        },
    })
}

function getBookingByUserId(userId: number){
    return prisma.booking.findFirst({
        where: {userId},
        include: {Room: true}
    })
}

function updateBooking(bookingId: number, roomId: number){
    return prisma.booking.update({
        where: {id: bookingId},
        data: {roomId}
    })
}


const bookingRepository = {
    getRoomById,
    createBooking,
    getBookingById,
    updateBooking,
    getBookingByUserId
}

export default bookingRepository