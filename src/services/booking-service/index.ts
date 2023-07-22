import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsRepository from "@/repositories/tickets-repository"
import bookingRepository from "@/repositories/booking-repository"
import { forbiddenError, notFound } from "@/errors"

async function postBooking(userId: number, roomId: number){
    await validateUser(userId)

    const room = await bookingRepository.getRoomById(roomId)
    console.log(room)
    if(!room) throw notFound("Room not found")

    return 1
}

async function validateUser(userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw forbiddenError("User has no enrollment")

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw  forbiddenError("User has no ticket")

    if(!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status !== 'PAID') return  forbiddenError()
    
}

const bookingService = {
    postBooking
}

export default bookingService