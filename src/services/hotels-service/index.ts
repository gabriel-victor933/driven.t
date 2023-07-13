import enrollmentsService from "@/repositories/enrollment-repository"
import { notFound,paymentRequired } from "@/errors"
import ticketsRepository from "@/repositories/tickets-repository"

async function getHotels(userId: number){
    await checkPaidTicket(userId)
}

async function getHotelRooms(userId: number){

}

async function checkPaidTicket(userId: number){
    const enrollment = await enrollmentsService.findWithAddressByUserId(userId)
    if(!enrollment) throw notFound("Enrollment not found")

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(ticket.status !== "PAID"||ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentRequired()
}

const hotelsServices = {
    getHotels,
    getHotelRooms
}

export default hotelsServices