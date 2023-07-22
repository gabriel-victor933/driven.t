import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsRepository from "@/repositories/tickets-repository"
import bookingRepository from "@/repositories/booking-repository"
import { forbiddenError, notFound } from "@/errors"

async function postBooking(userId: number, roomId: number){
    await validateUser(userId)
   
    await verifyRoom(roomId)

    const booking = await bookingRepository.createBooking(userId,roomId)
    return booking.id
}

async function validateUser(userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw forbiddenError("User has no enrollment")

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw  forbiddenError("User has no ticket")
    if(!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status !== 'PAID') throw  forbiddenError()

}

async function verifyRoom(roomId: number){
    const room = await bookingRepository.getRoomById(roomId)
    if(!room) throw notFound("Room not found")
    if(room.capacity <= room.Booking.length) throw forbiddenError("Room has already reached maximum capacity")
}

const bookingService = {
    postBooking
}

export default bookingService